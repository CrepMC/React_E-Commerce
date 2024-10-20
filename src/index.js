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
} from "./pages";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/RequireAuth"; // Import the HOC
import RequireAdmin from "./components/RequireAdmin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);
