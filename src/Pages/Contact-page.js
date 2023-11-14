
import Header from '../components/Header';
import "../Pages/Contact-page.css"
import { contactsCollection } from "../firebase/myFirebase";
import React, { useState } from "react";
import { addDoc} from "firebase/firestore";
import Footer from '../components/Footer';
function ContactPage(props) {
  const {  user  } = props;


const [formValues, setFormValues] = useState({ name: "", email: "", message:""});
const handleChange = (e) => {
  const inputName = e.target.name;
  const inputValue = e.target.value;


  setFormValues({ ...formValues, [inputName]: inputValue, });
};


  const handleSubmitButton = async () => { 
    
    await addDoc(contactsCollection, {
      name: formValues.name,
      message: formValues.message,
      email: formValues.email,
      userId: user.uid,
      userName: user.displayName,
     
    })
    .then((res) => {
  console.log(res);
    })
    .catch((err) => { 
      console.log(err);
    });
  };

  return (
<div>
    <div
    style={{
      backgroundColor: "#F5F6FA",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
    }}>
    <div><Header user={props.user} darkTeam={true} darkLogo={true}/></div>

 </div>

 <div >
 <form className="form">
 <h1>Contact Form  </h1>

 <label>Name</label>
 <input placeholder='Name'
 type='name'
 name='name'

 onChange={handleChange}
 />

 <label>Email</label>
 <input placeholder='Email'
 type='email'
 name='email'
 onChange={handleChange}
 />

 <label>Message</label>
 <textarea placeholder='Message'
 type='text'
 name='message'
 onChange={handleChange}
 />

 <button onClick={handleSubmitButton}   type='submit'>Submit</button>
 
 </form>
 
 
 
 </div>
 
<Footer/>
 </div>
  )
}

export default ContactPage 