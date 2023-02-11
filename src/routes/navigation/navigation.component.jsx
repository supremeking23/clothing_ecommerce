
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from './../../components/cart-icon/cart-icon.component';
import CartDropdown from './../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../context/user.context';
import { CartContext } from './../../context/cart.context';
import { signOutUser } from './../../utils/firebase/firebase.utils';
import "./navigation.styles.scss";





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
			<div className="navigation">
                <Link className="logo_container" to="/">
                    <img src="https://raw.githubusercontent.com/YihuaZhang2/crwn-clothing-v2/39aaa7ba2322046d6bfbc6d4b74f291f10d61cb6/src/assets/crown.svg" alt="crown-logo" className="logo" />
                </Link>
                <div className="nav_links_container">
                    <Link className="nav_link" to="/shop">
                        Shop
                    </Link>
                    { currentUser ? (<span className="nav_link" onClick={signOutHandler}>Sign Out</span>) : 
                    (<Link className="nav_link" to="/auth">
                        Sign In
                    </Link>)}
                    <CartIcon />
                </div>
                {/* short circuit operator  must be both true , components are all trutyh value*/}
                {isCartOpen && <CartDropdown /> }
			</div>
            <Outlet />
		</Fragment>
	);
};

export default Navigation;

//rerendering from context video