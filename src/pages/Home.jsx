import React, { useState } from 'react';
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    console.log("Search query:", query);
    if (query) {
      const response = await fetch(`https://fakestoreapi.com/products?search=${query}`);
      const results = await response.json();
      setSearchResults(results);
    } else {
      setSearchResults(null); // Clear results if the query is empty
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <Main />
      <Product />
      <Footer />
    </>
  );
}

export default Home;
