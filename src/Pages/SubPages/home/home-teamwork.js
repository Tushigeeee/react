import React from "react";
import HomeImageMeeting from "../../../images/home-page-meeting.jpg";
import MeetingCalander from "../../../icons/Meeting-Calender";
import MeetingBell from "../../../icons/Meeting-Bell";
import MeetingText from "../../../icons/Meeting-Text";
import "./home-teamwork.css";
function HomeTeamwork() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",

          backgroundColor: "#F5F6FA",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            position: "absolute",

            paddingTop: "200px",
            width: "465px",
            height: "363px",
            top: "10px",
            left: " 135px",
          }}
        >
          <h1
            style={{
              Font: "Mulish",
              Weight: "800",
              fontSize: "48px",
              lineHeight: "60.24px",
            }}
          >
          Your Hub for teamwork
          </h1>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            Give everyone you work with—inside and outside your company—a more
            productive way to stay in sync. Respond faster with emoji, keep
            conversations focused in channels, and simplify all your
            communication into one place.
          </p>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
              color: "lightblue",
              cursor: "pointer",
            }}
          >
            Learn more <p>-</p>
          </p>
        </div>
        <div>
          <img
            src={HomeImageMeeting}
            alt="Meeting"
            style={{
              width: "1179",
              height: "705px",
              marginTop: "100px",
              marginLeft: "850px",
              radius: "20px",
              border: "1px",
            }}
          />
        </div>
        <div  style={{
          position: "absolute",
          top: "80px",
          right: "150px",
        }}
        >
          <MeetingCalander />
        </div>
        <div style={{
          position: "absolute",
          bottom: "30px",
          right: "465px",
        }}>
          <MeetingBell />
        </div>
        <div   style={{
          position: "absolute",
          top: "180px",
          right: "367px",
        }}>
          <MeetingText />
        </div>
      </div>
    </div>
  );
}

export default HomeTeamwork;
