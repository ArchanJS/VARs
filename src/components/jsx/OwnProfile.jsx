import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import '../css/ownprofile.css';
import Post from './Post';
import { useHistory } from 'react-router-dom';

function OwnProfile() {

    const history=useHistory();

    const [name,setName]=useState("No data available!");
    const [email,setEmail]=useState("No data available!");
    const [userID,setUserID]=useState("No data available!");
    const [profilePicture,setProfilePicture]=useState("No data available!");

    const getData=async()=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("VARsToken")}`
                }
            }
            const {data}=await axios.get('api/private',config);
            setName(data.name);
            setEmail(data.email);
            setUserID(data.userID);
            setProfilePicture(data.profilePicture);
        } catch (error) {
            console.log("Can not get data!");
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("VARsToken")) getData();
        else history.push('/');
    },[history])

    return (
        <>
            <div className="container-fluid">
                <div className="own-profile-body bg-dark">
                    <div className="own-details">
                        <div className="own-img-div">
                            <img className="own-img" src={profilePicture} alt="User" />
                        </div>
                        <div className="text-center" style={{ color: "aqua", fontSize: "24px", borderBottom: "1px solid aqua" }}>{name}</div>
                        <div className="text-muted my-2">{userID}</div>
                        <div className="own-profile-card">
                            <h6 className="text-dark my-2">Club : Club name</h6>
                            <h6 className="text-dark mb-2"><EmailIcon /> : {email}</h6>
                            <button className="profile-edit-btn mx-auto my-2">Edit profile</button>
                            <div className="own-followers-following">
                                <div className="own-follow-div mt-2">
                                    <button className="own-follow-btn">Followers</button>
                                    <div className="text-dark mt-1">999</div>
                                </div>
                                <div className="own-follow-div mt-2">
                                    <button className="own-follow-btn">Following</button>
                                    <div className="text-dark mt-1">999</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="own-bio-posts">
                        <div className="own-bio-div mb-4">
                            <h1 style={{ color: "aqua", borderBottom: "2px solid aqua" }}>Bio</h1>
                            <p className="text-muted mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quam ex veniam ab. Suscipit quidem dolorem porro repellat temporibus recusandae tempora, voluptate maiores saepe ipsum vitae dolorum explicabo qui voluptatum debitis unde dolore, nam cum, ducimus labore. Perspiciatis, molestiae commodi?</p>
                        </div>
                        <div className="own-posts-details-div">
                            <h1 style={{ color: "aqua", borderBottom: "2px solid aqua" }}>Posts</h1>
                            <div className="own-posts mt-4">
                                <Post />
                                <Post />
                                <Post />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnProfile;
