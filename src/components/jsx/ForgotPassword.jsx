import React from 'react';
import '../css/forgotpassword.css';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

function ForgotPassword() {
    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark">
                    <form className="col-lg-6 col-md-6 col-sm-12 col-12 f-half">
                        <h1 className="display-4 app-name"><strong>Forgot Password</strong></h1>
                        <input className="form-control my-3 w-75 mx-auto bg-dark" style={{ color: "aqua" }} type="text" placeholder="Enter your email" aria-label="default input example" />
                        <button className="form-btn">Done</button>
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

export default ForgotPassword;
