import Products from "../components/Products"
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import { useState } from "react";


const Home = () => {
    const [show, setShow] = useState(true);
    const closeCart = () => setShow(false);
    const showCart = () => {
        console.log("showing cart");
        setShow(true);
    };

    return <>
        <NavBar showCart={showCart} />
        <Cart show={show} handleClose={closeCart} />
        <Products />
    </>
}

export default Home;