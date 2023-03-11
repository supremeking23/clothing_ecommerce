import {createContext, useReducer}  from "react";

import {createAction} from "../utils/reducer/reducer.utils";

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
});

const INITIATE_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};

export const CartProvider = ({children}) =>{


    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIATE_STATE);

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))
        // dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}});
    };

    const addItemToCart = (producttoAdd) => {
        const newCartItems = addCartItem(cartItems, producttoAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove, isRemoveFromList = false) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove, isRemoveFromList);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        // dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
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