import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/*
Represents a NavBar Component
@param showCart : a function that will be called on when the cart button of the navbar is clicked
*/

const NavBar = ({ showCart }) => {
    const onCartClick = () => {
        console.log("Pressed Button");
        showCart();
    }
    return <Navbar bg="primary" data-bs-theme="dark" sticky="top">
        <Container>
            <Navbar.Brand >InnoCaption</Navbar.Brand>
            <Navbar.Brand onClick={onCartClick} className="justify-content-end">
                <Button>

                    <img
                        src={require("../img/cart-icon.png")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Button>
            </Navbar.Brand>
        </Container>
    </Navbar>
}

export default NavBar;