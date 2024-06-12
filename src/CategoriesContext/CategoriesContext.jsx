import React, { createContext, useState } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [specificCategory, setSpecificCategory] = useState("");
  const [categoryName, setCategoryName] = useState(0);
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setloading] = useState(false);

  return (
    <CategoriesContext.Provider value={{ specificCategory, setSpecificCategory,loading, setloading,  categoryName, setCategoryName , products, setProducts, options, setOptions, selectedOption, setSelectedOption }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;