import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext.js';
import { getUserCart, createNewCart, clearCart } from '../CartCRUD.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const Cart = ({ show, handleClose }) => {
    const userId = useContext(UserContext);
    const [cart, setCart] = useState(createNewCart(userId));

    const onClickClear = () => {
        clearCart();
        setCart(createNewCart(userId));
    }

    useEffect(() => {
        const retrieveCart = async () => {
            const userCart = await getUserCart(userId);
            setCart(userCart);
        }
        retrieveCart();
    }, [show, userId])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Discounted Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.filter((cartItem) => cartItem.id).map((cartItem) => {
                                return <CartItem key={cartItem.id} item={cartItem} />
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
                    <Button onClick={onClickClear}>Purchase</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>);
}

const CartItem = ({ item }) => {
    return <tr>
        <th>{item.title}</th>
        <th>{item.quantity}</th>
        <th>${item.total.toFixed(2)}</th>
        <th>${item.discountedPrice.toFixed(2)}</th>
    </tr>
}
export default Cart;