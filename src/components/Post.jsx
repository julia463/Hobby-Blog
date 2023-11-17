import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useRoutes,
  } from "react-router-dom";
const Post = (props) => {
  return (
        <div className="Post">
            <div className="links">
                <Link to={"edit/" + props.id}>Edit </Link>
            </div>
        <h4>{props.created_at}</h4>
      <Link
        to={`/postDetails/${props.id}`}
        key={props.id}
       >{props.title}</Link>
      <h4>{props.upvoteCount} Upvotes</h4>
    </div>
 

  );
};
export default Post;
