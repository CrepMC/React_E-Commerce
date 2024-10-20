import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get('query'); // Get the search query from the URL

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        const queryWords = query.toLowerCase().split(' ');
        const filteredResults = data.filter(product =>
          queryWords.every(word => product.title.toLowerCase().includes(word))
        );
        setResults(filteredResults);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const highlightText = (text, query) => {
    const queryWords = query.toLowerCase().split(' ');
    const regex = new RegExp(`(${queryWords.join('|')})`, 'gi');
    return text.split(regex).map((part, index) =>
      queryWords.includes(part.toLowerCase()) ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <>
        <Navbar />
            <div className="container my-5">
                <h2>Search Results for: "{query}"</h2>
                    <div className="row">
                        {results.length > 0 ? (
                        results.map(product => (
                            <div className="col-md-4" key={product.id}>
                                <div className="card mb-4">
                                    <img src={product.image} className="card-img-top" alt="Card" height={200} width={200} style={{ objectFit: "scale-down" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{highlightText(product.title, query)}</h5>
                                        <p className="card-text">${product.price}</p>
                                        <a href={`/product/${product.id}`} className="btn btn-dark">View Product</a>
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p>No results found.</p>
                        )}
                    </div>
            </div>
        <Footer />
    </>
  );
};

export default SearchResults;
