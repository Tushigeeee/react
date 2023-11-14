import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addDoc } from "firebase/firestore";
import { auth, usersCollection } from "../firebase/myFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const validateForm = yup.object().shape({
  name: yup
    .string()
    .min(4, "Must be more than 4 characters")
    .max(10, "Must be less than 10 characters")
    .required(),
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .min(8, "Must be more than 8 characters  long")
    .required(),
  comfirmPassword: yup.string().min(8, "Must be more than 8 characters long"),
  checkBox: yup.boolean().oneOf([true], "must be checked"),
});

export const SignUp = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
    checkBox: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
    checkBox: "",
    required: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const navigate = useNavigate();
  const navigateToSignInPage = () => {
    navigate("/");
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    yup
      .reach(validateForm, e.target.name)
      .validate(e.target.value)
      .then((res) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [e.target.name]: err.message });
      });
    setFormValues({ ...formValues, checkBox: e.target.checked });
  };

  const handleSignUp = async (e) => {
    if (formValues.password !== formValues.comfirmPassword) {
      setFormErrors({
        ...formErrors,
        comfirmPassword: "Must be match with the password",
      });
    } else if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.comfirmPassword === "" ||
      formValues.checkBox === false
    ) {
      setFormErrors({
        ...formErrors,
        required: "All inputs must be required",
        comfirmPassword: "",
      });
    } else if (
      formErrors.name !== "" ||
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.comfirmPassword !== "" ||
      formErrors.checkBox !== ""
    ) {
      setFormErrors({
        ...formErrors,
        required: "All error must be cleared",
        confirmPassword: "",
      });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((res) => {
          const userId = res.user.uid;
          addDoc(usersCollection, {
            userId: userId,
            email: formValues.email,
            name: formValues.name,
            termAndCondition: formValues.checkBox,
          });
        })
        .catch((err) => {
          setFormErrors({ ...formErrors, required: err.message });
        });
    }
  };

  return (
    <div className="MainContainer">
      <div className="header">
        <Header user={props.user} darkTeam={true} darkLogo={true} />
      </div>
      <div className="ContentContainer">
        <h1>Sign Up</h1>

        <div className="NameContainer">
          Name
          <div className="Name">
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInput}
              style={{
                borderColor: formErrors.name.length > 0 ? "red" : "green",
              }}
            />
            <h6 className="NotificationName" style={{ color: "red" }}>
              {formErrors.name}
            </h6>
          </div>
        </div>

        <div className="emailContainer">
          Email
          <div className="email">
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleInput}
              style={{
                borderColor: formErrors.email.length > 0 ? "red" : "green",
              }}
            />
            <h6 className="NotificationEmail" style={{ color: "red" }}>
              {formErrors.email}
            </h6>
          </div>
        </div>

        <div className="passwordContainer">
          Password
          <div className="password">
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInput}
              style={{
                borderColor: formErrors.password.length > 0 ? "red" : "green",
              }}
            />
            <h6 className="NotificationPassword" style={{ color: "red" }}>
              {formErrors.password}
            </h6>
          </div>
        </div>

        <div className="ComfirmpasswordContainer">
          Comfirm Password
          <div className="Comfirmpassword">
            <input
              type="password"
              name="comfirmPassword"
              value={formValues.comfirmPassword}
              onChange={handleInput}
              style={{
                borderColor: formErrors.password.length > 0 ? "red" : "green",
              }}
            />
            <h6
              className="NotificationComfirmPassword"
              style={{ color: "red" }}
            >
              {formErrors.comfirmPassword}
            </h6>
          </div>
        </div>

        <div className="ShowPassword">
          {/* ... */}
          Show Password
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPassword}
          />
        </div>

        <div className="TermContainer">
          <h4>Agree term and Condition </h4>
          <input
            className="checkbox"
            type="checkbox"
            checked={formValues.checkBox}
            onChange={handleCheckBox}
          ></input>

          <h6 className="NotificationCheckBox" style={{ color: "red" }}>
            {formErrors.checkBox}
          </h6>
        </div>
        <div className="Buttons">
          {" "}
          <button id="SignUpButton" onClick={handleSignUp}>
            Sign Up{" "}
          </button>
          <button id="SignInButton" onClick={navigateToSignInPage}>
            Sign In
          </button>{" "}
          <h3 style={{ color: "red" }}>{formErrors.required}</h3>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
