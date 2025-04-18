import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [loading2, setLoading2] = useState(true); // Set loading2 to true initially
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addProduct = async (product) => {
    dispatch(addCart(product));

    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        cart: arrayUnion(product.id)
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/womenShoes.json");
      const products = await response.json();
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
      setLoading(false);

      // Fetch similar products
      const similarProducts = products.filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id);
      setSimilarProducts(similarProducts);
      setLoading2(false);
    };

    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    addProduct(product);
    navigate("/checkout");
  };

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    if (!product) return null;

    return (
      <div className='container my-5 py-2'>
        <div className='row'>
          <div className='col-md-6 col-sm-12 py-3'>
            <img
              className='img-fluid'
              src={product.image}
              alt={product.title}
              width='300px'
              height='300px'
            />
          </div>
          <div className='col-md-6 py-5'>
            <h4 className='text-uppercase text-muted'>{product.category}</h4>
            <h1 className='display-5'>{product.title}</h1>
            <p className='lead'>
              {product.rating && product.rating.rate}{' '}
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
            </p>
            <h3 className='display-6 my-4'>${product.price}</h3>
            <p className='lead'>{product.description}</p>
            <button
              className='btn btn-outline-dark'
              onClick={() => addProduct(product)}>
              Add to Cart
            </button>
            <button className='btn btn-dark mx-3' onClick={handleBuy}>
              Buy
            </button>
            <Link to='/cart' className='btn btn-dark mx-3'>
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          {[...Array(4)].map((_, index) => (
            <div className="mx-4" key={index}>
              <Skeleton height={400} width={250} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center">
              <img
                className="card-img-top p-3"
                src={item.image}
                alt="Card"
                height={200}
                width={200}
                style={{ objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.title}
                </h5>
              </div>
              <div className="card-body">
                <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProductPage = () => {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
          <div className="row my-5 py-5">
            <div className="d-none d-md-block">
              <h2>You may also Like</h2>
              <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
                {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
              </Marquee>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return <ProductPage />;
};

export default Product;