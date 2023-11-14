import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProductsCreateNewProductModel from "./products-create-new-product-modal";
import { blogsCollection } from "../../firebase/myFirebase";
import { onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function ProductsPage(props) {
const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      onSnapshot(blogsCollection, (collection) => {
        const fireBaseDocData = collection.docs.map((doc) => {
          const blogId = doc.id;
          const blogData = doc.data(); //returns as id
          blogData.blogId = blogId;
          return blogData;
        });
        setData(fireBaseDocData);
      });

      setLoading(false);
    };
    getData();
  }, []);
  console.log(data);

  const [openModal, setOpenModal] = useState(false);
  const handleCreateNewPost = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const handleBlogClick = (id) => {
    navigate(`/products/${id}`);
  };


  
  return (
    <div>
      <Header user={props.user} darkTeam={true} darkLogo={true} />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white ",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            width: "1080px",
            height: "100vh",
            backgroundColor: "transparent",
          }}
        >
          <button style={{marginBottom:"10px", cursor:"pointer", backgroundColor:"#FFFAF0"}} onClick={handleCreateNewPost}> Create new post</button>
          {loading && <div>Loading data ...</div>}
          {!loading && data.length === 0 && <div>There is Not Data</div>}
          {!loading && data.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "30px",
                width: "1080px",
                height: "90%",
                backgroundColor: "transparent",
                flexWrap: "wrap",
                overflow: "scroll",

              }}
            >
              {data.map((blog, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      handleBlogClick(blog.blogId);
                    }}
                    style={{
                      minWidth: "300px",
                      width: "20px",
                      backgroundColor: "rgb(245,245,245)",
                      paddingTop: "30px",
                      paddingLeft: "30px",
                      paddingRight: "42px",
                      height: "374px",
                      borderRadius: "8px",
                      boxShadow: " 2px 2px 2px 2px hsla(0,0%,70%,.693)",
                      cursor: "pointer",
                      
                    }}
                  >
                    <div style={{ paddingBottom: "50px" }}>{blog.title}</div>
                    <img
                      src={blog.blogImage}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                    <div> {blog.text}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <ProductsCreateNewProductModel
          user={props.user}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </div>
      <Footer/>
    </div>
    
  );
}

export default ProductsPage;
