import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../css/post.css';

function Post() {
    return (
        <>
            <div className="own-post-card mt-4 p-4">
                <h4 className="text-dark my-1" style={{ borderBottom: "2px solid black" }}>This is a heading!</h4>
                <h6 className="text-muted my-1" >Posted by someone</h6>
                <div className="own-post-content mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus vel cumque architecto placeat expedita exercitationem at magnam, reiciendis molestias sapiente sit cupiditate eum, doloremque maiores necessitatibus quas accusamus totam itaque! Labore neque et corporis minus nisi vitae odit numquam doloremque obcaecati? Explicabo id distinctio amet tempore asperiores, totam dolorem laboriosam! Commodi placeat, praesentium nobis ab vitae quo dolor quia voluptatem eum ut, obcaecati aliquam iusto illum quaerat optio nulla eos esse. Rem quis qui excepturi, ratione dolores beatae voluptate earum, voluptatum nulla quos tempora? Blanditiis impedit voluptas mollitia eaque aperiam, quod cupiditate vitae harum eveniet. Suscipit cum maiores quod odit.
                </div>
                <div className="own-post-like-and-time my-4">
                    <div className="own-post-like">
                        <FavoriteBorderIcon style={{ color: "black", cursor: "pointer" }} /> 999
                    </div>
                    <div className="own-post-time text-muted mt-1" style={{ fontSize: "12px" }}>12/7/21 at 10:10</div>
                </div>
            </div>
        </>
    )
}

export default Post;
