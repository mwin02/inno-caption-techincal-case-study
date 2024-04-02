import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

/*
The component responsible for retreiving and displaying the lists of products as well as paging them.
*/

function Products() {
    const [itemPerPage, setItemPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const [numProducts, setNumProducts] = useState(0);
    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("all");


    const handleSearch = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
            const productJson = await response.json();
            setProducts(productJson.products);
            setItemPerPage("all");
            setPageNumber(1);
            setNumProducts(productJson.limit);
            setCurrentCategory("none");
        } catch (e) {
            console.log(e);
        }
    }

    const clearSearch = () => {
        setSearchTerm("");
        setCurrentCategory("all");
        setItemPerPage(10);
        setPageNumber(1);
    }

    useEffect(() => {
        const retreiveCategories = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/categories`);
                const categoriesJson = await response.json();
                setCategories(["all", ...categoriesJson, "none"]);
            } catch (e) {
                console.log(e);
            }
        }

        retreiveCategories();
    }, [])

    useEffect(() => {
        const retrieveProducts = async () => {
            try {
                const skip = (pageNumber - 1) * itemPerPage;
                const response = await fetch(`https://dummyjson.com/products?limit=${itemPerPage}&skip=${skip}&select=title,price,discountPercentage,thumbnail`);
                const productsJson = await response.json();
                setProducts(productsJson.products);
                setNumProducts(productsJson.total);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm === "" && currentCategory === "all") {
            retrieveProducts();
        }

        if (pageNumber * itemPerPage > numProducts) {
            setPageNumber(Math.ceil(numProducts / itemPerPage))
        }
        // eslint-disable-next-line
    }, [itemPerPage, pageNumber, numProducts]);

    useEffect(() => {
        const filterCategory = async () => {
            if (currentCategory === "none") {
                return;
            }
            if (currentCategory === "all") {
                setSearchTerm("");
                setItemPerPage(10);
                setPageNumber(1);
                return;
            }
            try {
                const response = await fetch(`https://dummyjson.com/products/category/${currentCategory}`);
                const productsJson = await response.json();
                setSearchTerm("");
                setPageNumber(1);
                setItemPerPage("all");
                setProducts(productsJson.products);
                setNumProducts(productsJson.limit);
            } catch (e) {
                console.log(e);
            }

        }
        filterCategory();
    }, [currentCategory])

    let pageButtons = [];
    for (let i = 0; i < (numProducts / itemPerPage); i++) {
        let buttonVariant = "outline-primary";
        if (i + 1 === pageNumber) {
            buttonVariant = "primary";
        }
        pageButtons.push(<Button variant={buttonVariant} key={i} onClick={() => setPageNumber(i + 1)}>{i + 1}</Button>)
    }

    return (
        <>
            <br />
            <Row className="justify-content-md-center">
                <Col xs lg="5">
                    <Form.Control type="text" placeholder="Search For Items" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
                <Col xs lg="1">
                    <Button onClick={handleSearch}>Search</Button>
                </Col>
                <Col xs lg="1">
                    <Button onClick={clearSearch}>Clear</Button>
                </Col>
                <Col xs lg="3">
                    <Form.Select aria-label="Categories" value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}>
                        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                    </Form.Select>
                </Col>
            </Row>
            <br />
            <Row>
                <ProductList products={products} />
            </Row>
            <br />
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <ButtonGroup className="me-2" aria-label="Pages">
                        {pageButtons}
                    </ButtonGroup>
                </Col>
            </Row >
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form.Select aria-label="Items Per Page" value={itemPerPage} onChange={(e) => setItemPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="all" hidden>all</option>
                    </Form.Select>
                </Col>
            </Row>
            <br />
        </>
    );
}

export default Products;


