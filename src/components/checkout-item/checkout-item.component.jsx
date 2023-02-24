import "./checkout-item.styles.scss";
import { CartContext } from './../../context/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const {addItemToCart, removeItemFromCart} = useContext(CartContext);

    const clearItemHandler = () => removeItemFromCart(cartItem, true);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <div className="value" >{quantity}</div>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={clearItemHandler}>&#10005;</span>
        </div>
    );
};

export default CheckoutItem;