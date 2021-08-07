import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../css/nav.css'
import {userContext} from '../../App';

function Nav() {

    const history=useHistory();

    const {state,dispatch}=useContext(userContext);


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-4 my-auto" exact to='/'><SportsSoccerIcon style={{fontSize:"40px", color:"aqua"}}/> VARs</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 me-4 mb-lg-0">
                            {
                                state
                                ?
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" exact to='/ownprofile' style={{cursor:"pointer"}}><AccountCircleIcon style={{marginTop:"-4px", marginBottom:"0px"}}/></NavLink>
                                </li>
                                :
                                <></>
                            }
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/about'>About </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/contact'>Contact</NavLink>
                            </li>
                            {
                                state 
                                ?
                                <>
                                <li className="nav-item mx-2">
                                    <p className="nav-link" onClick={()=>{
                                        dispatch({type:"USER",payload:false});
                                        localStorage.removeItem("VARsToken");
                                        history.push('/login');
                                    }} style={{cursor:"pointer"}}><ExitToAppIcon style={{marginTop:"-4px", marginBottom:"0px"}}/></p>
                                </li>
                                </>
                            :
                            
                            <>
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                                </li>
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" exact to='/register'>Register</NavLink>
                                </li>
                            </>
                            }
                        </ul>
                        {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;
