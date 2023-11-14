import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
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



function EditBlogModal(props) {
  const { openEditModal, selectedBlog, closeEditModal } = props;
  const [inputValueTitle, setInputValueTitle] = useState("");
  const [inputValueText, setInputValueText] = useState("");

  const handleInputTitle = (e) => {
    setInputValueTitle(e.target.value);
  };
  const handleInputText = (e) => {
    setInputValueText(e.target.value);
  };

  useEffect(() => {
    if (selectedBlog) {
      setInputValueTitle(selectedBlog.title);
      setInputValueText(selectedBlog.text);
    }
  }, [selectedBlog]);

  const handleCancelButton = () => {
  
    closeEditModal();
  };

  const handleSaveButton = async () => {
    await updateDoc(doc(blogsCollection, selectedBlog.blogId), {
      ...selectedBlog,
      title: inputValueTitle,
      text: inputValueText
    })
      .then((res) => {
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={openEditModal} style={customStyles} ariaHideApp={false}>
   <div style={{
    width: "500px",
    height: "500px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",

  }}>
  <h3 style={{marginBottom:"2px"}}>Title</h3>
      <div
        style={{
          width: "500px",
         display: "flex",
         alignItems: "center",
         overflow: "scroll",
         height: "100px",
         justifyContent: "center",
       
        }}
      >
        <input value={inputValueTitle} onChange={handleInputTitle} />
      </div>
      <h3>Description</h3>
      <div
      style={{
        width: "500px",
       display: "flex",
       alignItems: "center",
       overflow: "scroll",
       height: "100px",
       justifyContent: "center",
      }}
    >
      <textarea value={inputValueText} onChange={handleInputText} />
    </div>
   
   </div>
      <div>
        <button onClick={handleSaveButton} >Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    </Modal>
  );
}

export default EditBlogModal;
