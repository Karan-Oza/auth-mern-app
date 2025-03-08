import React, { useEffect, useState } from "react";
import { handlerror, handlesuccess } from "../utlis";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggesInUser, setLoggedInfo] = useState("");
  const [Products, setProducts] = useState([]); // Initialize as an array
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInfo(localStorage.getItem("loggesInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggesInUser");
    handlesuccess("User Log Out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://auth-mern-app-5.onrender.com/api/product";
      const header = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, header);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handlerror(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome, {loggesInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Product List</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {Products.length > 0 ? (
          Products.map((product, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                width: "200px",
                textAlign: "center",
              }}
            >
              <h3>{product.name}</h3>
              <p>Price: ₹ {product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
