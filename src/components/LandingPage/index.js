import React from "react";
import homeImg from "../../assets/home.png";
import "./styles.css";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import ButtonComponent from "../common/Button";

export default function Dashboard() {
    const handleClick = () => {
        const authToken = sessionStorage.getItem("auth_token");
        if(authToken){
            window.location.href = "/dashboard";
        }
        else{
            window.location.href = "/login";
        }
    }
    return (
        <div className="home">
            <div className="home-content">
                <h1 className="home-title">Now Track Your</h1> 
                <h1 className="title-huge">To-do Tasks...</h1>
                <div className="main-title">
                    <h1 style={{color: "var(--white)", textShadow: "2px 2px 4px #000000", fontSize: "4rem"}} className="title-medium">With</h1>
                    <h1 style={{color: "var(--purple)", textShadow: "2px 2px 4px #000000"}} className="title-medium">Routine.</h1>
                </div>
                <p className="home-btn" onClick={handleClick}><ButtonComponent text="Get Started" bgColor={"black"} icon={<DirectionsRunRoundedIcon />} isOutline={false} /></p>
            </div>
            <img className="home-img" src={homeImg} alt="home" />
        </div>
    )
}