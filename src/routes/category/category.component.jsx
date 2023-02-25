
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { CategoryContext } from './../../context/categories.context';
import ProductCard from "../../components/product-card/product-card.component";


const Category = () => {
    const { category } = useParams();
    const {categoriesMap} = useContext(CategoryContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);


    return(
        <div className="category-container">
            {   
                //only render product if it has a value
                // error occur because of data fetching (something to do with asyncronous approach but our code runs it syncrounously)

                products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )

};


export default Category;