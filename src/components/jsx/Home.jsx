import React from 'react';
import '../css/home.css';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

function Home() {
    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 f-half">
                        <h1 className="display-2 app-name"><strong><SportsSoccerIcon style={{fontSize:"80px", color:"aqua", marginBottom:"3px"}}/>VARs</strong></h1>
                        <h1 className="h1 text-dark"><strong>Let's build a community</strong></h1>
                        <button className="join-btn">Join us</button>
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

export default Home;
