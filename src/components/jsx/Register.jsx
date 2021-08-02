import React, { useState } from 'react';
import axios from 'axios';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import '../css/register.css';
import {NavLink} from 'react-router-dom';

function Register() {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cPassword,setCPassword]=useState("");

    const postData=async(e)=>{
        try {
            e.preventDefault();
            if(name.trim()==="" || email==="" || password==="" || cPassword==="") window.alert("Please enter all the details!");
            else if(password!==cPassword)window.alert("Passwords didn't match!");
            else{
                const config = {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  };
                await axios.post('/api/auth/register',{name,email,password},config);
                window.alert("Registration successful!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark">
                    <form className="col-lg-6 col-md-6 col-sm-12 col-12 f-half" onSubmit={postData}>
                    <h1 className="display-4 app-name"><strong>Register</strong></h1>
                    <input className="form-control my-3 w-75 mx-auto bg-dark" style={{color:"aqua"}} type="text" placeholder="Enter your full name" aria-label="default input example" value={name} type="text" onChange={(e)=>setName(e.target.value)}/>
                    <input className="form-control my-3 w-75 mx-auto bg-dark" style={{color:"aqua"}} type="text" placeholder="Enter your email" aria-label="default input example" value={email} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input className="form-control my-3 w-75 mx-auto bg-dark" style={{color:"aqua"}} type="text" placeholder="Enter password" aria-label="default input example" value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <input className="form-control my-3 w-75 mx-auto bg-dark" style={{color:"aqua"}} type="text" placeholder="Confirm password" aria-label="default input example" value={cPassword} type="password" onChange={(e)=>setCPassword(e.target.value)}/>
                    <button className="form-btn" type="submit">Register</button>
                    <div className="reg-fp-rl-links">
                            <NavLink exact to='/login' className="reg-rl-fp">Already a user?</NavLink>
                        </div>
                    </form>
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

export default Register
