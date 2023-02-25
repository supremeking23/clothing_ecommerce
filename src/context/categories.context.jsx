import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import PRODUCTS from "../shop-data.json";
import SHOP_DATA from "../shop-data";

export const CategoryContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // do it ony once
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // }, [])

    useEffect(()=> {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);

            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);
    const value = { categoriesMap };
    return (
        <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
    )
}