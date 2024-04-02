import Products from "../components/Products"
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import { useState } from "react";
import { Container } from "react-bootstrap";

/*
The Component representing the Home Page
*/
const Home = () => {
    const [show, setShow] = useState(false);
    const closeCart = () => {
        setShow(false)
    };
    const showCart = () => {
        setShow(true);
    };

    return <>
        <NavBar showCart={showCart} />
        <Cart show={show} handleClose={closeCart} />
        <Container>
            <Products />
        </Container>
    </>
}

export default Home;