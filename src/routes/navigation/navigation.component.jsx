
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import "./navigation.styles.scss";

const Navigation = () => {
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
                    <Link className="nav_link" to="/auth">
                        Sign In
                    </Link>
                </div>
			</div>
            <Outlet />
		</Fragment>
	);
};

export default Navigation;