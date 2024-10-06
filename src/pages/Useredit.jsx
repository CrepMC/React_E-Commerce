import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { updateProfile } from "firebase/auth";

const UserEdit = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
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
        navigate("/login"); 
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; 
    setImage(selectedImage); 
    setImagePreview(URL.createObjectURL(selectedImage)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        userData.imageUrl = imageUrl; 
      }

      await setDoc(userDoc, userData, { merge: true });
      toast.success("User data updated successfully!");
      navigate("/user"); 
      const userUpdate = {
        displayName: userData.displayName,
        phone: userData.phone,
      };

      await updateProfile(auth.currentUser, userUpdate); 

      if (image) {
        const imageUrl = await getDownloadURL(ref(storage, `images/${image.name}`)); 
        await setDoc(userDoc, { imageUrl: imageUrl }, { merge: true }); 
      }
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
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div className="mb-3 text-center">
            <img 
              src={imagePreview} 
              alt="Preview of user upload" 
              className="img-preview" 
              style={{ width: 'auto', height: 'auto' }} 
            />
          </div>
        )}
        <button type="submit" className="btn btn-dark">Update</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default UserEdit;
