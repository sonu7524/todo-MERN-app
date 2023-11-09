import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import accountImg from "../assets/account.png";
import { getUser } from "../functions/getUser";

export default function AccountPage() {
    let[user,setUser] = useState({});

    useEffect(() => {
        getData();
    }, []);
    async function getData () {
        const user = await getUser();
        if(user){
            setUser(user);
        }
    }
    return (
        <div>
            <Header />
            <div className="account">
                <div className="account-card">
                    <div className="account-title">
                        <h1>ACCOUNT</h1>
                        <img style={{width: "10rem", height: "10rem"}} src={accountImg} alt="account" />
                    </div>
                    <div className="account-details">
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}