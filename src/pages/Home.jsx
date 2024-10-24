import React, { useState } from 'react';
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const [searchResults, setSearchResults] = useState(null); // searchResults is used to store the results of the product search

  const handleSearch = async (query) => {
    console.log("Search query:", query);
    if (query) {
      const response = await fetch(`https://fakestoreapi.com/products?search=${query}`);
      const results = await response.json();
      setSearchResults(results); // Update searchResults with the fetched results
    } else {
      setSearchResults(null); // Clear results if the query is empty
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <Main />
      <Product results={searchResults} /> {/* Pass searchResults to Product component */}
      <Footer />
    </>
  );
}

export default Home;
