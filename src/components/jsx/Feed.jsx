import React, { useState } from 'react';
import axios from 'axios';
import '../css/ownposts.css';
import Post from './Post';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';

function Feed() {

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [isLikedLi, setIsLikedLi] = useState([]);

    const createPost = async (e) => {
        e.preventDefault();
        try {
            if(!localStorage.getItem("VARsToken")) window.alert("Please login to create any post!");
            else if (title.trim() === "" || content.trim() === "") {
                window.alert("Don't leave any field empty!");
            }
            else if (title.length > 20) {
                window.alert("Title should contain less than or equals to 20 characters");
            }
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                    },
                };
                await axios.post('/api/private/createpost', { title, content }, config);
                setTitle("");
                setContent("");
                window.alert("Post created!");
                const { data } = await axios.get('/api/auth/allposts', config);
                console.log(data);
                setPosts(data);
            }
        } catch (error) {
            window.alert("Can not create post!");
        }
    }

    const getPosts = async () => {
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.get('/api/auth/allposts', config);
            if(localStorage.getItem("VARsToken")){
                config={
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                    },
                };
                const res = await axios.post('/api/private/isliked', { data }, config);
                setIsLikedLi(res.data);
            }
            else{
                for(let i=0;i<data.length;i++){
                    setIsLikedLi(...isLikedLi,false);
                }
            }
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }


    useState(() => {
        getPosts();
    }, [history])


    const likeOrUnlike = async (postID) => {
        try {
            if(!localStorage.getItem("VARsToken")) window.alert("Please login to react any post!");
            else{
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("VARsToken")}`,
                    },
                };
                await axios.patch('/api/private/likeunlike', { postID }, config);
                const { data } = await axios.get('/api/auth/allposts', config);
                console.log(data);
                setPosts(data);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <div className="container-fluid d-flex flx-column">
                <div className="ownposts bg-dark pt-5">
                    <form className="col-lg-4 col-md-8 col-sm-12 col-12 text-dark p-4 animate__animated animate__backInDown border rounded m-4" style={{ backgroundColor: "aqua" }} onSubmit={createPost}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="my-2">Title: </label>
                            <input type="text" className="form-control my-2 p-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleFormControlTextarea1" className="my-2">Content: </label>
                            <textarea className="form-control p-2" id="exampleFormControlTextarea1" placeholder="Enter content" rows="6" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <div className="form-group m-2 my-4">
                            <button type="submit" className="btn btn-info float-end border border-info rounded-circle text-white pb-0"><AddCircleOutlineIcon style={{ fontSize: "40px", color: "black" }} /></button>
                        </div>
                    </form>
                    {
                        posts.length > 0
                            ?
                            posts.map((val, ind) => {
                                return <Post title={val.title} content={val.content} key={val.postID} postID={val.postID} postedBy={val.postedBy} createdAt={val.createdAt.substr(0, 10)} totalReacts={val.reactedBy.length} checkLike={likeOrUnlike} isLiked={isLikedLi[ind]} />
                            })
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Feed
