

import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';




const Shop = () => {
	return(
		<div>
			<h2>Shop page</h2>
		</div>
	);
};

const App = () => {

	return(
		<Routes>
			<Route path="/" element={<Navigation />}>
				{/* will render home component if the route is / */}
				<Route index={true} element={<Home />}/>
				<Route path={"shop"} element={<Shop />}/>
				<Route path={"auth"} element={<Authentication />}/>
			</Route>
		</Routes>

	);
};
// https://console.firebase.google.com/project/clothing-ecommerce-db-382b8/overview
export default App;
