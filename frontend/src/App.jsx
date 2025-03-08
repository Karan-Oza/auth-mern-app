import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import 'react-toastify/ReactToastify.css';
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";

function App() {

  const [IsAuthenticated , setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=> {
    return IsAuthenticated ? element : <Navigate to="/login" />
  }

  

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
