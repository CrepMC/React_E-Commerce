import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const UserEdit = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          toast.error("No user data found!");
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, userData, { merge: true });
      toast.success("User data updated successfully!");
      navigate("/user"); // Redirect to profile page after update
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="container my-5">
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            name="displayName"
            value={userData.displayName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default UserEdit;
