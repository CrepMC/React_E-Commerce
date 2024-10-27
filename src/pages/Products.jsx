import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { toast } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/womenShoes.json');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success('Added to cart');
  };

  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>Products</h1>
        <hr />
        <div className='row'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className='col-md-3 col-sm-6 col-xs-8 col-12 mb-4'>
                <div className='card text-center h-100'>
                  <img
                    className='card-img-top p-3'
                    src={product.image}
                    alt={product.title}
                    height={200}
                    width={200}
                    style={{ objectFit: 'scale-down' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.title}</h5>
                    <p className='card-text'>{product.description.substring(0, 70)}...</p>
                    <p className='lead'>${product.price}</p>
                  </div>
                  <div className='card-body'>
                    <Link
                      to={'/product/' + product.id}
                      className='btn btn-dark m-1'>
                      Buy Now
                    </Link>
                    <button
                      className='btn btn-dark m-1'
                      onClick={() => addProduct(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
