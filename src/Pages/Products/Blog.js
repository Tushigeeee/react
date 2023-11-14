import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogsCollection, commentsCollection } from "../../firebase/myFirebase";
import {
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Header from "../../components/Header";
import Comments from "./comments";

import EditBlogModal from "./EditBlogModal";

function Blog(props) {
  const { user} = props;
  const { id } = useParams();
  const selectedBlogId = id;
  const navigate = useNavigate()

  const [blogData, setBlogData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getBlogPageData = async () => {
      setLoading(true);
      const blogs = await getDocs(blogsCollection);
      const blogsData = blogs.docs.map((doc) => {
        const blogId = doc.id;
        const blogData = doc.data();
        blogData.blogId = blogId;
        return blogData;
      });

      const selectedBlog = blogsData.find((blog) => {
        return blog.blogId === selectedBlogId;
      });

      setBlogData(selectedBlog);

      if(selectedBlog) {

        onSnapshot(commentsCollection, (collection) => {
          const fireBaseCommentData = collection.docs.map((doc) => {
            const commentId = doc.id;
            const commentData = doc.data();
            commentData.commentId = commentId;
            return commentData;
          });
          const blogComments = fireBaseCommentData.filter((comment) => {
            return comment.blogId === selectedBlog.blogId;
          });
          setCommentsData(blogComments);
        });
      }


      setLoading(false);
    };

    getBlogPageData();
  }, [selectedBlogId]);

  const handleCommentButton = async () => {
    await addDoc(commentsCollection, {
      comment: inputValue,
      blogId: blogData.blogId,
      userId: user.uid,
    })
      .then((res) => {
        setInputValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteBlog = async (blogId) => {
    await deleteDoc(doc(blogsCollection, blogId))
      .then((res) => {
     navigate('/products')
      })
      .catch((err) => console.log(err));
  };

  const handleOpenEditModel = (blog) => {
    setSelectedBlog(blog);
    setOpenEditModal(true);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "1080px",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <div>Loading..</div>}
      {!loading && !blogData ? (
        <div>Blog Not found</div>
      ) : (
        <div>
          <Header user={props.user} darkTeam={true} darkLogo={true} />

          <div>
          {blogData.userId === user.uid && (
            <div style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              justifyContent: 'center',
marginBottom:"5px",
             
            }}>
              <button  style={{
                cursor: "pointer",
                width: "50px",
                height: "20px",}}
                onClick={() => {
                  handleOpenEditModel(blogData);
                }}
              >
                Edit
              </button>
              <button style={{
                cursor: "pointer",
                width: "50px",
                height: "20px",}}
                onClick={() => {
                  handleDeleteBlog(blogData.blogId);
                }}
              >
                Delete
              </button>
            </div>
          )}
            <EditBlogModal
              openEditModal={openEditModal}
              selectedBlog={selectedBlog}
              closeEditModal={closeEditModal}
            />
          </div>

          <div
            style={{
              minWidth: "800px",
              width: "800px",
              backgroundColor: "rgb(245,245,245)",
              marginTop: "40px",
              marginLeft: "350px",
              alignItems: "center",
              justifyContent: "center",
              height: "500px",
              borderRadius: "8px",
              boxShadow: "2px 2px 2px 2px hsla(0,0%,70%,.693)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              {blogData.title}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
              }}
            >
              <img
                src={blogData.blogImage}
                alt=""
                width="400px"
                height="300px"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              {blogData.text}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <input
                placeholder="Leave Your Comment"
                onChange={handleInputValue}
                value={inputValue}
              />
              <button onClick={handleCommentButton}>Comment</button>
            </div>
            <Comments data={commentsData} userId={user.uid} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
