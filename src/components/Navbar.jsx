import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const cartItems = useSelector(state => state.handleCart);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && !currentUser.displayName) {
                console.warn("User displayName is undefined");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="search-box">
                        <div className="input-group input-group-sm">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon1" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons text-right">
                {user ? (
                    <>
                        <img src="./assets/anonymous.png" alt="User" className="rounded-circle" style={{ height: "50px", objectFit: "scale-down" }} />
                        <span className="navbar-text mx-2">
                            <NavLink className="nav-link" to="/user/edit">Welcome, {user.displayName || "new user"}</NavLink>
                        </span>
                        <button className="btn btn-outline-dark m-2" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="btn btn-outline-dark m-2">
                            <i className="fa fa-sign-in-alt mr-1"></i> Login
                        </NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2">
                            <i className="fa fa-user-plus mr-1"></i> Register
                        </NavLink>
                    </>
                )}
                <NavLink to="/cart" className="btn btn-outline-dark m-2">
                    <i className="fa fa-cart-shopping mr-1"></i> Cart ({cartItems.length})
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;