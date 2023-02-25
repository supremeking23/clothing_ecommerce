// import SHOP_DATA from "../../shop-data.json";
import { useContext, Fragment} from 'react';

import { CategoryContext } from '../../context/categories.context';

// import ProductCard from '../product-card/product-card.component';
import CategoryPreview from './../../components/category-preview/category-preview.component';
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoryContext);
    return(
        <Fragment>
           {
            
            Object.keys(categoriesMap).map((title) => {
             
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products}/>

           })
            
           }
        </Fragment>

    )
};

export default CategoriesPreview;