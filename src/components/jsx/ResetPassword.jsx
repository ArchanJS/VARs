import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import '../css/resetpassword.css';
import { useHistory, useParams } from 'react-router-dom';

function ResetPassword() {

    const history=useHistory();

    const {token}=useParams();

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const postData = async (e) => {
        try {
            e.preventDefault();
            if (password === "" || cPassword === "") window.alert("Please enter all the details!");
            else if(password!==cPassword) window.alert("Passwords did not match!");
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                await axios.post(`/api/auth//resetpassword/${token}`, { password }, config);
                window.alert("Password updated!");
                history.push('/login');
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("VARsToken")) history.push('/');
    },[history])

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark">
                    <form className="col-lg-6 col-md-6 col-sm-12 col-12 f-half" onSubmit={postData}>
                        <h1 className="display-4 app-name"><strong>Reset password</strong></h1>
                        <input className="form-control my-3 w-75 mx-auto bg-dark" style={{ color: "aqua" }} placeholder="Enter password" aria-label="default input example" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        <input className="form-control my-3 w-75 mx-auto bg-dark" style={{color:"aqua"}} placeholder="Confirm password" aria-label="default input example" value={cPassword} type="password" onChange={(e)=>setCPassword(e.target.value)}/>
                        <button className="form-btn" type="submit">Done</button>
                    </form>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 s-half">
                        <div className="display-6 s-text text-center">
                            Welcome to our website. Share your thoughts about today's football matches with others. Connect to the world. <strong style={{ color: "black", backgroundColor: "aqua", padding: "6px", paddingInline: "10px", border: "1px solid aqua", borderRadius: "10px" }}>Have fun !</strong> <SportsSoccerIcon style={{ fontSize: "60px", color: "aqua" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
