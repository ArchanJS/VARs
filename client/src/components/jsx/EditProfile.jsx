import React, { useEffect, useState } from 'react';
import '../css/editprofile.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditProfile() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [name, setName] = useState("No data available");
    const [profilePicture, setProfilePicture] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [bio,setBio]=useState("No data available");
    const [favouriteClub,setFavouriteClub]=useState("No data available");

    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("VARsToken")) {
            history.push("/login");
        }
    }, [history]);

    const getUser = async () => {
        if (localStorage.getItem("VARsToken")) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                    },
                };
                const { data } = await axios.get("/api/private", config);
                setName(data.name);
                setProfilePicture(data.profilePicture);
                setBio(data.bio);
                setFavouriteClub(data.favouriteClub);
            } catch (err) {
                history.push('/error');
                console.log(err)
            }
        }
    }
    useEffect(() => {
        getUser();
    }, [history])

    const postData = async (e) => {
        e.preventDefault();
        try {
            if (name.trim() === "" || profilePicture.trim() === "" || bio.trim() ==="" || favouriteClub.trim() ==="") {
                window.alert("Don't leave any field empty!");
            }
            else if(bio.length>100){
                window.alert("Your bio should contain maximum 100 characters!");
            }
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                    },
                };
                const { data } = await axios.patch(`/api/private/updateprofile`, {
                    name, profilePicture, bio, favouriteClub
                },
                    config
                )
                history.push('/ownprofile');
            }
        } catch (err) {
            console.log(err)
        }
    }


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setProfilePicture(base64.toString());
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }

    const deleteProfile = async () => {
        try {
            console.log("h1");
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                },
            };
            console.log("h2");
            await axios.delete(`/api/private/deleteprofile`, config);
            console.log("h3");
            localStorage.removeItem('VARsToken');
            history.push('/login');
        } catch (err) {
            console.log(err)
            history.push('/error');
        }
    }


    return (
        <div>
            <form>
                <div className="container-fluid">
                    <div className="own-profile-body bg-dark">
                        <div className="own-details">
                            <div className="own-edit-img-div">
                                <img className="own-img" src={profilePicture} alt="User" />
                            </div>
                            <div className="own-profile-card bg-dark border border-dark">
                                <input type="file" className="text-center form-control" onChange={(e) => { uploadImage(e) }} />
                            </div>
                        </div>
                        <div className="own-editprofile">
                            <div className="own-editprofile-div mb-4">
                                <h1 style={{ color: "aqua", borderBottom: "2px solid aqua" }}>Edit profile</h1>
                                <input className="form-control mt-5 w-75 bg-dark py-2 ps-2" style={{ color: "aqua" }} placeholder="Enter your full name" aria-label="default input example" value={name} type="text" onChange={(e) => setName(e.target.value)} />
                                <input className="form-control mt-5 w-75 bg-dark py-2 ps-2" style={{ color: "aqua" }} placeholder="Enter your favourite club" aria-label="default input example" value={favouriteClub} onChange={(e)=>setFavouriteClub(e.target.value)} />
                                <textarea type="text" className="form-control mt-5 w-75
                             bg-dark py-2 ps-2" style={{ color: "aqua" }} placeholder="Bio" rows="6" value={bio} onChange={(e)=>setBio(e.target.value)}/>
                                <div className="editprofile-buttons mt-5">
                                    <button className="editprofile-btn" onClick={postData}>Update</button>
                                    <button className="editprofile-btn" onClick={(e)=>{
                                        e.preventDefault();
                                        handleClickOpen();
                                    }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className="px-4 pt-4 pb-2" id="alert-dialog-title">{"Do you surely want to delete your account ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="px-4 pb-4">
                            All the datas will be deleted permanently !
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" className="px-2 pb-3" autoFocus>
                            Close
                        </Button>
                        <Button onClick={deleteProfile} color="secondary" className="px-2 pb-3">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    )
}

export default EditProfile;
