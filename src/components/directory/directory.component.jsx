import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({categories}) => {
    return(
        <div className="directory_container">
        {categories.map((category) => (
            <DirectoryItem category={category} key={category.id} />
        ))}
       
    </div>
    );
}

export default Directory;