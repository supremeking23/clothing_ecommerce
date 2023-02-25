import "./category-preview.styles.scss";
import ProductCard from './../product-card/product-card.component';
import { Link } from "react-router-dom";

const CategoryPreview = ({title, products}) => {

    return(
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={`${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
                {/* <span className="title"></span> */}
            </h2>
            <div className="preview">
                {   //ignore the product, index inside of the array
                    //.filter first 4 product
                    products.filter((_,index) => index < 4).map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    );
};


export default CategoryPreview;