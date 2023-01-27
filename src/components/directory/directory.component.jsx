import CategoryItem from "../category-item/category-item.component";

const Directory = ({categories}) => {
    return(
        <div className="directory_container">
        {categories.map((category) => (
            <CategoryItem category={category} />
        ))}
       
    </div>
    );
}

export default Directory;