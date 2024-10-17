import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { delCart, addCart } from "../redux/action";
import { toast } from "react-hot-toast";
import { db, auth } from "../firebase/firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    const saveCartToFirestore = async () => {
      if (user) {
        const cartDoc = doc(collection(db, "carts"), user.uid);
        await setDoc(cartDoc, { cartItems: state });
      }
    };

    saveCartToFirestore();
  }, [state, user]);

  const handleRemove = (product) => {
    dispatch({ type: "REMOVEITEM", payload: product });
    toast.success("Item removed from cart");
  };

  const handleAdd = (product) => {
    dispatch(addCart(product));
  };

  const handleDel = (product) => {
    dispatch(delCart(product));
  };

  const handleBuy = () => {
    navigate("/checkout");
  };

  const ShowCart = () => {
    return (
      <>
        {state.map((item) => {
          return (
            <div key={item.id} className="row d-flex align-items-center my-2">
              <div className="col-12 col-md-2">
                <div className="bg-image rounded" data-mdb-ripple-color="light">
                  <img src={item.image} className="w-100" alt={item.title} style={{ height:"120px", objectFit:"scale-down" }} />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <h5>{item.title}</h5>
                <p>{item.description.substring(0, 50)}...</p>
              </div>
              <div className="col-12 col-md-3">
                <h5>${item.price}</h5>
              </div>
              <div className="col-12 col-md-3 d-flex align-items-center">
                <button className="btn btn-outline-dark" onClick={() => handleDel(item)}>-</button>
                <span className="mx-2">{item.qty}</span>
                <button className="btn btn-outline-dark" onClick={() => handleAdd(item)}>+</button>
                <button className="btn btn-outline-danger mx-2" onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          );
        })}
        <button className="btn btn-dark mt-3" onClick={handleBuy}>Buy</button>
      </>
    );
  };

  const EmptyCart = () => {
    return <h3>Your cart is empty</h3>;
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;