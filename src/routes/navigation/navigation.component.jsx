
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from './../../components/cart-icon/cart-icon.component';
import CartDropdown from './../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../context/user.context';
import { CartContext } from './../../context/cart.context';
import { signOutUser } from './../../utils/firebase/firebase.utils';
// import "./navigation.styles.jsx";

import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.styles"


const Navigation = () => {
    //re run component when states update, or props changes
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);

    const {isCartOpen} = useContext(CartContext); 

    const signOutHandler = async () => {
        await signOutUser();
    };
	return(
		<Fragment>
            {/* dont want to render anything, use this instead of div */}
			<NavigationContainer>
                <LogoContainer to="/">
                    <img src="https://raw.githubusercontent.com/YihuaZhang2/crwn-clothing-v2/39aaa7ba2322046d6bfbc6d4b74f291f10d61cb6/src/assets/crown.svg" alt="crown-logo" className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">Shop</NavLink>
                    {/* render as span */}
                    { currentUser ? (<NavLink as="span" onClick={signOutHandler}>Sign Out</NavLink>) : (<NavLink to="/auth">Sign In</NavLink>) }
                    <CartIcon />
                </NavLinks>
                    {/* short circuit operator  must be both true , components are all trutyh value*/}
                    {isCartOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
		</Fragment>
	);
};

export default Navigation;

//rerendering from context video



