import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import '../css/login.css';
import { NavLink, useHistory } from 'react-router-dom';
import {userContext} from '../../App';

function Login() {

    const history=useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {state,dispatch}=useContext(userContext);

    const postData = async (e) => {
        try {
            e.preventDefault();
            if (email === "" || password === "") window.alert("Please enter all the details!");
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const {data}=await axios.post('/api/auth/login', {email, password }, config);
                localStorage.setItem("VARsToken",data);
                window.alert("Login successful!");
                dispatch({type:"USER",payload:true});
                history.push('/');
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
                        <h1 className="display-4 app-name"><strong>Login</strong></h1>
                        <input className="form-control my-3 w-75 mx-auto bg-dark" style={{ color: "aqua" }} placeholder="Enter your email" aria-label="default input example" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                        <input className="form-control my-3 w-75 mx-auto bg-dark" style={{ color: "aqua" }} placeholder="Enter password" aria-label="default input example" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="form-btn" type="submit">Login</button>
                        <div className="fp-rl-links">
                            <NavLink exact to='/forgotpassword' className="rl-fp">Forgot password?</NavLink>
                            <NavLink exact to='/register' className="rl-fp">New user?</NavLink>
                        </div>
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

export default Login
