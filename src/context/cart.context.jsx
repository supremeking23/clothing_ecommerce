import {createContext, useState, useEffect}  from "react";

/** Helper function */

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToadd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    
    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }
    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity:1}];
}


const removeCartItem = (cartItems, cartItemToRemove, isRemoveFromList) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1 || isRemoveFromList){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // return back cartitems with matching cart item with reduce quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};


export const CartContext = createContext({
    /** all of this are properties */
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart:() => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    cartTotal:0,
    cartCount: 0
});

export const CartProvider = ({children}) =>{
    //actual useState
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setcartTotal] = useState(0);

    //govern only 1 responsibility. best practice
    useEffect(() => {
        //currentTotal, currentCartItem
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);

    
    useEffect(() => {
        //currentTotal, currentCartItem
        const newCartTotal = cartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0);
        setcartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (producttoAdd) => {
        setCartItems(addCartItem(cartItems, producttoAdd));
    }

    const removeItemFromCart = (cartItemToRemove, isRemoveFromList = false) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove, isRemoveFromList));
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * 
 * 
 * 
 * 
 */