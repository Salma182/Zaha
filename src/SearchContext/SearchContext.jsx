import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider value={{
      input, setInput,
      products, setProducts,
      showResults, setShowResults,
      loading, setLoading
    }}>
      {children}
    </SearchContext.Provider>
  );
};
