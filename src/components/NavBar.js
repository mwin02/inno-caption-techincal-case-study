import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ({ showCart }) => {
    const onCartClick = () => {
        console.log("Pressed Button");
        showCart();
    }
    return <Navbar bg="primary" data-bs-theme="dark" sticky="top">
        <Container>
            <Navbar.Brand href="#">InnoCaption</Navbar.Brand>
            <Navbar.Brand onClick={onCartClick} href='#' className="justify-content-end">
                <img
                    src={require("../img/cart-icon.png")}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
        </Container>
    </Navbar>
}

export default NavBar;