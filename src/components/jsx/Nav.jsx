import React from 'react';
import { NavLink } from 'react-router-dom';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

function Nav() {
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
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/about'>About </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/contact'>Contact</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" exact to='/register'>Register</NavLink>
                            </li>
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
