import { useState, useContext } from "react"
import PlusMinusButton from "./PlusMinusButton"
import { createCartItem, addItemToCart } from "../CartCRUD"
import { UserContext } from "../UserContext"
import { Button, Table } from "react-bootstrap"

const ProductList = ({ products }) => {
    if (!products) {
        return <p>Error Loading the Products. Please Refresh the Page.</p>
    }
    const productRows = products.map((product) => <Product product={product} key={product.id} />)
    return <Table>
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {productRows}
        </tbody>
    </Table>
}

const Product = ({ product }) => {
    const userId = useContext(UserContext);
    const [quantity, setQuantity] = useState(0);
    const onClickAdd = () => {
        console.log(`Added ${quantity} ${product.title} to cart`);
        const totalPrice = product.price * quantity;
        const discountedPrice = (totalPrice * (1 - product.discountPercentage / 100));
        const cartItem = createCartItem(product.id, product.title, product.price, quantity, totalPrice, product.discountPercentage, discountedPrice, product.thumbnail);
        addItemToCart(userId, cartItem);
        setQuantity(0);
    }
    return <tr>
        <td><img src={product.thumbnail} width="50" height="50" alt={product.title} /></td>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>
            <PlusMinusButton number={quantity} onMinusClick={() => setQuantity(quantity - 1)} onPlusClick={() => setQuantity(quantity + 1)} />
        </td>
        <td>
            <Button onClick={onClickAdd}>Add To Cart</Button>
        </td>
    </tr>
}



export default ProductList;