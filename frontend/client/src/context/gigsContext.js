import React, { createContext, useState, useEffect } from 'react';

export const GigsContext = createContext();

const GigsContextProvider = (props) => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Make API call to fetch categories and products data
    const fetchCategoriesAndProducts = async () => {
      const categoriesResponse = await fetch('/cat');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    };

    fetchCategoriesAndProducts();
  }, []);



  return (
    <GigsContext.Provider value={{ categories}}>
      {props.children}
    </GigsContext.Provider>
  );
};

export default GigsContextProvider;
