import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext.js';
import { getUserCart, createNewCart, clearCart, updateCart } from '../CartCRUD.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import PlusMinusButton from './PlusMinusButton.js';

/*
Represents a Cart Modal Component
@param show : a boolean determining whether the Cart Modal should be showed or not
@param handleClose : a function that will be called when the Modal is exited from
*/

const Cart = ({ show, handleClose }) => {
    const userId = useContext(UserContext);
    const [cart, setCart] = useState(createNewCart(userId));

    const onClickClear = async () => {
        await clearCart(userId);
        setCart(createNewCart(userId));
    }

    const onItemQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 0) {
            return;
        }
        console.log(`function called for item ${itemId} to newQuantity ${newQuantity}`);
        const itemIndex = cart.products.findIndex((item) => item.id === itemId);
        const item = cart.products[itemIndex];
        const newCart = { ...cart };
        newCart.totalQuantity -= (item.quantity - newQuantity);
        newCart.total -= (item.quantity - newQuantity) * item.price;
        newCart.discountedTotal -= (item.quantity - newQuantity) * (item.price * (1 - item.discountPercentage / 100));
        newCart.products[itemIndex].quantity = newQuantity;
        newCart.products[itemIndex].total = newQuantity * item.price;
        newCart.products[itemIndex].discountedPrice = (newQuantity * item.price * (1 - item.discountPercentage / 100))
        setCart(newCart);
    }

    const onCartSave = async () => {
        cart.products = cart.products.filter((item) => item.quantity > 0);
        updateCart(userId, cart);
    }

    useEffect(() => {
        const retrieveCart = async () => {
            console.log("retreiving cart");
            const userCart = await getUserCart(userId);
            setCart(userCart);
        }
        retrieveCart();
    }, [show, userId])

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Total Price</th>
                                <th>Discounted Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log("rerender")}
                            {cart.products.filter((cartItem) => cartItem.id).map((cartItem) => {
                                return <CartItem key={cartItem.id} item={cartItem} onItemQuantityChange={onItemQuantityChange} />
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>${cart.total.toFixed(2)}</th>
                                <th>${cart.discountedTotal.toFixed(2)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClickClear}>Clear Cart</Button>
                    <Button onClick={onCartSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

/*
Represents the component for an item in the cart
@param item : an object containing the details of the item to be displayed
@param onItemQuantityChange: a function that is called to change the quantity of the corresponding item
*/

const CartItem = ({ item, onItemQuantityChange }) => {
    return <tr>
        <th><img src={item.thumbnail} width="50" height="50" alt={item.title} /></th>
        <th>{item.title}</th>
        <th>${item.total.toFixed(2)}</th>
        <th>${item.discountedPrice.toFixed(2)}</th>
        <th><PlusMinusButton number={item.quantity} onMinusClick={() => onItemQuantityChange(item.id, item.quantity - 1)} onPlusClick={() => onItemQuantityChange(item.id, item.quantity + 1)} /></th>
    </tr>
}
export default Cart;