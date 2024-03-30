import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext.js';
import { getUserCart, createNewCart } from '../CartCRUD.js';


const Cart = () => {
    const userId = useContext(UserContext);
    const [cart, setCart] = useState(createNewCart(userId));

    useEffect(() => {
        const retrieveCart = async () => {
            const userCart = await getUserCart(userId);
            setCart(userCart);
        }
        retrieveCart();
    }, [userId])
    return <div>
        <h3>Cart</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Discounted Price</th>
                </tr>
            </thead>
            <tbody>
                {cart.products.map((cartItem) => {
                    return <CartItem key={cartItem.id} item={cartItem} />
                })}
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th>${cart.total}</th>
                    <th>${cart.discountedTotal}</th>
                </tr>
            </tfoot>
        </table>
    </div>
}

const CartItem = ({ item }) => {
    return <tr>
        <th>{item.title}</th>
        <th>{item.quantity}</th>
        <th>${item.total}</th>
        <th>${item.discountedPrice}</th>
    </tr>
}
export default Cart;