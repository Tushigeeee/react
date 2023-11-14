
import Header from "../../../components/Header";
import HomeImage from "../../../images/home-image.jpg";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => { toast("Email sent!");
};
  
function HomeIntro(props) {
  

  return (
    <div
      style={{
        background: `url(${HomeImage}) no-repeat center center fixed`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header user={props.user} />
      <div
        style={{
          width: "1080px",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            color: "white",
            paddingTop: "196px",
            width: "40%",
          }}
        >
          Instant collaborations for remote teams
        </div>
        <div
          style={{
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            color: "white",
            paddingTop: "22px",
            width: "30%",
          }}
        >
          All in one for your remote team chats, collaboration and track
          projects
        </div>
        <div style={{ paddingTop: "70px" }}>
          <input
            style={{
              width: "316.971px",
              height: "56px",
              borderRadius: "4px",
              border: "2px solid vari(--Light-Gray, #BBC8D4)",
              background: "vari(--White, #FFF)",
            }}
            placeholder="Email"
          />
          <button  onClick={notify}
            style={{
              marginLeft: "15px",
              height: "61px",
              padding: "16px 20px",
              borderRadius: "4px solid transparent",
              background: "#0BBEF2",
            }}
           
          >
            Get early access
          </button>
          <ToastContainer/>

        </div>
      </div>
    </div>
  );
}

export default HomeIntro;
