import { useEffect, useState } from 'react';
import ProductList from './ProductList';

function Products() {
    const [itemPerPage, setItemPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [numProducts, setNumProducts] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const retrieveProducts = async () => {
            try {
                const skip = (pageNumber - 1) * itemPerPage;
                const response = await fetch(`https://dummyjson.com/products?limit=${itemPerPage}&skip=${skip}&select=title,price`);
                const json = await response.json();
                setProducts(json.products);
                setNumProducts(json.total);
            } catch (e) {
                console.log(e);
            }
        }

        retrieveProducts();
        if (pageNumber * itemPerPage > numProducts) {
            setPageNumber(Math.ceil(numProducts / itemPerPage))
        }
    }, [itemPerPage, pageNumber, numProducts]);

    let pageButtons = [];
    for (let i = 0; i < (numProducts / itemPerPage); i++) {
        pageButtons.push(<button key={i} onClick={() => setPageNumber(i + 1)}>{i + 1}</button>)
    }

    return (
        <div>
            <ProductList products={products} />
            <div>
                {pageButtons}
            </div>
            <label>
                Items Per Page:
                <select value={itemPerPage} onChange={(e) => setItemPerPage(e.target.value)} name="itemsPerPage" id="itemsPerPage">
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </label>
        </div>
    );
}

export default Products;


