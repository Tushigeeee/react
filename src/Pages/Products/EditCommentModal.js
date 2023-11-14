import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { commentsCollection } from "../../firebase/myFirebase";

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

function EditCommentModal(props) {
  const { openEditModal, selectedComment, closeEditModal } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (selectedComment) {
      setInputValue(selectedComment.comment);
    }
  }, [selectedComment]);

  const handleCancelButton = () => {
    setInputValue(selectedComment.comment);
    closeEditModal();
  };

  const handleSaveButton = async () => {
    await updateDoc(doc(commentsCollection, selectedComment.commentId), {
      ...selectedComment,
      comment: inputValue,
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
      >Edit Comment
        <input value={inputValue} onChange={handleInput} />
      </div>
      <div>
        <button onClick={handleSaveButton}>Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    </Modal>
  );
}

export default EditCommentModal;
