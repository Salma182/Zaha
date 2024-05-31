import React, { createContext, useState } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [specificCategory, setSpecificCategory] = useState("");
  const [categoryName, setCategoryName] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <CategoriesContext.Provider value={{ specificCategory, setSpecificCategory,  categoryName, setCategoryName , products, setProducts }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;