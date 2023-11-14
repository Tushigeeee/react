import { useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import LogoDark from "../icons/Logo-Dark";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/myFirebase";

const Header = (props) => {
  const handleSignOut = async () => {
    await signOut(auth)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { darkTeam, user } = props;
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  const handleProductsPage = () => {
    navigate("/products");
  };

  
  const handleContactPage = () => {
    navigate("/contact");
  };

  const handleProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div
      className="header"
      style={{
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        height: "40px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1080px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {props.darkLogo ? (
            <LogoDark onClick={handleHomePage} style={{ cursor: "pointer" }} />
          ) : (
            <Logo onClick={handleHomePage} style={{ cursor: "pointer" }} />
          )}
        </div>
        {props.user ? (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                color: darkTeam ? "#6D7D88" : "#FFFF",
              }}
              onClick={handleProductsPage}
            >
              Products
            </span>
           
            <span
              style={{
                cursor: "pointer",
                color: darkTeam ? "#6D7D88" : "#FFFF",
              }}
              onClick={handleContactPage}
            >
              Contact
            </span>
            <span
              style={{
                cursor: "pointer",
                color: darkTeam ? "#6D7D88" : "#FFFF",
              }}
              onClick={handleProfilePage}
            >
              Profile
            </span>
            <div className="signOut">
              <span
                style={{
                  cursor: "pointer",
                  color: darkTeam ? "#6D7D88" : "#FFFF",
                }}
                onClick={handleSignOut}
              >
                {" "}
                Sign out
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
