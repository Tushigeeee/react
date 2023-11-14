import React from 'react'
import Header from '../components/Header';
function ProfilePage(props) {
  return (
    <div
    style={{
      backgroundColor: "#F5F6FA",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
    }}>
    <div>
          <Header user={props.user} darkTeam={true} darkLogo={true}/>
        </div>
    <div>Profile-page</div>
    </div>
  )
}

export default ProfilePage;