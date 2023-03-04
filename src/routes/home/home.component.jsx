
import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";
import "../../components/directory/directory.syles.scss";


const Home = () => {

    return (
      <div>
		<Directory/>
		<Outlet />
	  </div>
    );
}

export default Home;
