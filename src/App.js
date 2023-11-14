import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase/myFirebase";
import { SignUp } from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/Products/Products-page";
import ContactPage from "./Pages/Contact-page";
import ProfilePage from "./Pages/Profile-page";
import Blog from "./Pages/Products/Blog";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsUserLoggedIn(true);
        setUser(user);
      } else {
        setIsUserLoggedIn(false);
      }
      setLoading(false);
    });
    return () => getUser();
  }, []);

  return (
    <div>
      {loading && (
        <div style={{ fontSize: "100px", color: "green" }}>Loading...</div>
      )}
      <BrowserRouter>
        {!loading && isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/products" element={<ProductsPage user={user} />} />
            <Route path="/contact" element={<ContactPage user={user} />} />

            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/products/:id" element={<Blog user={user} />} />
          </Routes>
        )}

        {!loading && !isUserLoggedIn && (
          <Routes>
            <Route path="/sign-up" element={<SignUp user={user} />} />

            <Route path="/" element={<SignIn user={user} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
