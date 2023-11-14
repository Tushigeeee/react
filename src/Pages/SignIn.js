import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/myFirebase";
import * as yup from "yup";
import Header from "../components/Header";
import "./SignIn.css";
import Footer from "../components/Footer";

const validateForm = yup.object().shape({
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .min(8, "Must be more than 8 characters  long")
    .required(),
});

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    required: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });
    setFormValues({ ...formValues, [name]: value });
  };
  const navigate = useNavigate();
  const handleNavigateToSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignIn = async () => {
    if (formValues.email === "" || formValues.password === "") {
      setFormErrors({ ...formErrors, required: "Must enter all input" });
    } else if (formErrors.email !== "" || formErrors.password !== "") {
      setFormErrors({ ...formErrors, required: "All errors must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
    }
    await signInWithEmailAndPassword(
      auth,
      formValues.email,
      formValues.password
    )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, required: err.message });
      });
  };
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, required: err.message });
      });
  };
  return (
    <div className="mainContainer">
      <Header user={props.user} darkTeam={true} darkLogo={true} />
      <div className="ContentContainer" >
        <h1 style={{marginTop:"80px"}}>Welcome Back!</h1>
        <div className="Email">
          <input
            style={{ width: "170px" }}
            placeholder="Enter your email address"
            onChange={handleInput}
            value={formValues.email}
            name="email"
          />
          <div style={{ color: "red" }}>{formErrors.email}</div>
        </div>
        <div>
          <input
            style={{ width: "170px" }}
            placeholder="Enter your email password"
            onChange={handleInput}
            value={formValues.password}
            name="password"
            type="Password"
          />
          <div style={{ color: "red" }}>{formErrors.password}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button style={{ width:"200px"  }} onClick={handleSignIn}>
            Sign-In
          </button>
          <div style={{ color: "red" }}>{formErrors.required}</div>
          <div>Create new account</div>
          <div style={{marginBottom:"250px"}}>
            <button onClick={handleNavigateToSignUp}>Sign-Up</button>
            <button onClick={handleSignInWithGoogle}>
              Sign-In with Google
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default SignIn;
