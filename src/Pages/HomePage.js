import HomeIntro from "./SubPages/home/home-intro";
import HomeTeamwork from "./SubPages/home/home-teamwork";


import Footer from "../components/Footer";

const HomePage = (props) => {
  return (
    
    <div  >
   
      <HomeIntro user={props.user} />
      <HomeTeamwork />
     

      <Footer/>
    </div>
  );
};

export default HomePage;
