import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../css/post.css';

function Post({title, content, postID, postedBy, createdAt, totalReacts, checkLike, isLiked}) {

    const [liked,setLiked]=useState(isLiked);

    return (
        <>
            <div className="own-post-card mt-4 p-4">
                <h4 className="text-dark my-1" style={{ borderBottom: "2px solid black" }}>{title}</h4>
                <h6 className="text-muted my-1" >Posted by {postedBy}</h6>
                <div className="own-post-content mt-2 pe-1">{content}
                </div>
                <div className="own-post-like-and-time my-4" onClick={()=>{
                    if(localStorage.getItem("VARsToken")){
                        checkLike(postID);
                        setLiked(!liked);
                    }
                    else{
                        window.alert("Please login to react to any post!");
                    }
                    
                }}>
                    <div className="own-post-like">
                        {
                            liked
                            ?
                            <FavoriteIcon style={{ color: "black", cursor: "pointer" }}/>
                            :
                            <FavoriteBorderIcon style={{ color: "black", cursor: "pointer" }}/>
                        } {totalReacts}
                    </div>
                    <div className="own-post-time text-muted mt-1" style={{ fontSize: "12px" }}>{createdAt}</div>
                </div>
            </div>
        </>
    )
}

export default Post;
