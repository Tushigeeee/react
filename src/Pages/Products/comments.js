import React, { useState } from "react";
import { commentsCollection } from "../../firebase/myFirebase";
import { deleteDoc, doc } from "firebase/firestore";
import EditCommentModal from "./EditCommentModal";
 
function Comments(props) {
  const { data, userId } = props;

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleDeleteComment = async (commentId) => {
    await deleteDoc(doc(commentsCollection, commentId))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenEditModel = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div>
      {data.map((comment, index) => {
        return (
          <div key={index} style={{ border: "1px solid black" }}>
            {comment.comment}
            {comment.userId === userId && (
              <div>
                <button
                  onClick={() => {
                    handleOpenEditModel(comment);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteComment(comment.commentId);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
      <EditCommentModal
        openEditModal={openEditModal}
        selectedComment={selectedComment}
        closeEditModal={closeEditModal} 
      />
    </div>
  );
}

export default Comments;