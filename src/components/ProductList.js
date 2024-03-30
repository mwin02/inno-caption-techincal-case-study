import { useState } from "react"
import PlusMinusButton from "./PlusMinusButton"

const ProductList = ({ products }) => {
    const productRows = products.map((product) => {
        return <Product product={product} key={product.id} />
    })
    return <table>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {productRows}
        </tbody>
    </table>
}

const Product = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const onClickAdd = () => {
        console.log(`Added ${quantity} ${product.title} to cart`);
        setQuantity(0);
    }
    return <tr>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>
            <PlusMinusButton number={quantity} setNumber={setQuantity} />
            <button onClick={onClickAdd}>Add To Cart</button>
        </td>
    </tr>
}



export default ProductList;