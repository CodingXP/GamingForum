import React from "react";
import { useParams } from "react-router-dom";

function Post({title}, {desc}, {user}) {
    const params = useParams();
    const postId = params.postId;

    return(
        <div>
            Cool page {postId}x``
        </div>
    );
}


export default Post;