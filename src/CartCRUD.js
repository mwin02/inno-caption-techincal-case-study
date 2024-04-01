const createNewCart = (id) => {
    return {
        id: 21,
        userId: id,
        products: [],
        total: 0,
        discountedTotal: 0,
        totalProducts: 0,
        totalQuantity: 0,
    }
}

const createCartItem = (id, title, price, quantity, total, discountPercentage, discountedPrice, thumbnail) => {
    return { id, title, price, quantity, total, discountPercentage, discountedPrice, thumbnail }
}

// Get Current Cart
const getUserCart = async (userId) => {
    try {
        // how I would retreive from the api if it was functional
        /*
        const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
        const json = await response.json();
        if (json.total === 0) {
            return createNewCart(userId);
        } else {
            return json.carts[0];
        }
        */
        // instead we will use local storage in order to keep track of items in the cart
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        } else {
            let newCart = createNewCart(userId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        }
    } catch (e) {
        console.log(e);
    }
}

const addToCart = (cart, newItem) => {
    let itemToAdd = cart.products.findIndex((item) => item.id === newItem.id);
    if (itemToAdd !== -1) {
        let oldItem = cart.products[itemToAdd];
        cart.products[itemToAdd] = {
            ...oldItem,
            quantity: oldItem.quantity + newItem.quantity,
            total: oldItem.total + newItem.total,
            discountedPrice: oldItem.discountedPrice + newItem.discountedPrice
        }
    } else {
        cart.products.push(newItem);
        cart.totalProducts++;
    }
    cart.total += newItem.total;
    cart.totalQuantity += newItem.quantity;
    cart.discountedTotal += newItem.discountedPrice;
    return cart;
}

// // Make an API call to add an object to the cart
const addItemToCart = async (userId, newItem) => {
    try {
        let oldCart = await getUserCart(userId);
        let newCart = addToCart(oldCart, newItem);
        // How the backend would be updated if the API was functional
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(oldCart)
        });
        const json = await response.json();
        console.log(json);

        // The cart will be updated and stored in local storage 
        localStorage.setItem('cart', JSON.stringify(newCart));
    } catch (e) {
        console.log(e);
    }
}

// Make an API call to update a cart
const updateCart = async (userId, newCart) => {
    try {
        const response = await fetch(`https://dummyjson.com/carts/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                newCart
            })
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('cart', JSON.stringify(newCart));
    } catch (e) {
        console.log(e);
    }
}


// Make an API call to clear the cart
const clearCart = async (userId) => {
    try {
        const response = await fetch(`https://dummyjson.com/carts/${userId}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        console.log(json);
        localStorage.removeItem('cart');
    } catch (e) {
        console.log(e);
    }

}

export { createNewCart, getUserCart, addItemToCart, createCartItem, clearCart, updateCart }