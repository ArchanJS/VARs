import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/home.css';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { useHistory, useParams } from 'react-router-dom';

function EmailVerification() {

    const history=useHistory();
    const [isVerified,setIsVerified]=useState("");
    const {token}=useParams();

    const verifyEmail=async()=>{
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              console.log(token);
            await axios.get(`/api/auth/verify/${token}`,config);
            setIsVerified("Email verified!")
        } catch (error) {
            setIsVerified("Email is not verified!");
        }
    }

    useEffect(()=>{
        verifyEmail();
    },[history])

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 f-half">
                        <h1 className="display-2 app-name"><strong><SportsSoccerIcon style={{fontSize:"40px", color:"aqua", marginBottom:"3px"}}/>{isVerified}</strong></h1>
                        <button className="join-btn" onClick={()=>{history.push('/')}}>Go to home</button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 s-half">
                        <div className="display-6 s-text text-center">
                            Welcome to our website. Share your thoughts about today's football matches with others. Connect to the world. <strong style={{color:"black",backgroundColor:"aqua",padding:"6px",paddingInline:"10px",border:"1px solid aqua",borderRadius:"10px"}}>Have fun !</strong> <SportsSoccerIcon style={{fontSize:"60px", color:"aqua"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailVerification;
