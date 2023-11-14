import Modal from "react-modal";
import React, { useState } from "react";
import { addDoc} from "firebase/firestore";
import { blogsCollection } from "../../firebase/myFirebase";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

function ProductsCreateNewProductModel(props) {

  const { closeModal, user, openModal } = props;

  const [formValues, setFormValues] = useState({ title: "", text: "", image:""});

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormValues({ ...formValues, [inputName]: inputValue });
  };
  

  const handleSubmitButton = async () => {
    await addDoc(blogsCollection, {
      title: formValues.title,
      text: formValues.text,
      userName: user.displayName,
      userImage: user.photoURL,
      userId: user.uid,
      blogImage: formValues.image,
    })
    .then((res) => {
  closeModal();
    })
    .catch((err) => { 
      console.log(err);
    });
  };
 




  return (
    <Modal isOpen={openModal} style={customStyles} ariaHideApp={false}>
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "15px" }}>
          <label>Title</label>
          <input
            placeholder="Please enter blog title"
            type="text"
            name="title"
          
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
        <label>Text</label>
        <textarea
          placeholder="Please enter blog Text"
          type="text"
          name="text"
         
          onChange={handleChange}
        />
      </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <label>Image</label>
          <textarea
            placeholder="Please enter blog Image"
            type="image"
            name="image"
           
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmitButton}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
}

export default ProductsCreateNewProductModel;
