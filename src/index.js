import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  UserEdit,
  Profile,
  SearchResults,
  Payment,
} from "./pages";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/RequireAuth"; // Import the HOC
import RequireAdmin from "./components/RequireAdmin";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your publishable key from Stripe
const stripePromise = loadStripe('your-publishable-key-here');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/product" element={<RequireAuth><Products /></RequireAuth>} />
            <Route path="/product/:id" element={<RequireAuth><Product /></RequireAuth>} />
            <Route path="/about" element={<RequireAuth><AboutPage /></RequireAuth>} />
            <Route path="/contact" element={<RequireAuth><ContactPage /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/user/edit" element={<RequireAuth><UserEdit /></RequireAuth>} />
            <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
            <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path="/checkout" element={<RequireAdmin><Checkout /></RequireAdmin>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Elements>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);
