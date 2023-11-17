import React from "react";
import { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import "./FullPost.css";
const FullPost = () => {
  const { id: postId } = useParams();
  const [fullPost, setFullPost] = useState(null);
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState("");

  //Use effect to fetch posts
  useEffect(() => {
    console.log(`Post id is ${postId}`);
    const fetchPost = async () => {
      try {
        if (postId) {
          const { data, error } = await supabase
            .from("Posts")
            .select()
            .eq("id", postId)
            .single();

          if (error) {
            console.error("error fetching post");
          } else {
            setFullPost(data);
            setCount(data.upvoteCount);
          }
        }
      } catch (error) {
        console.error("Error fetching post: ", error.message);
      }
    };
    fetchPost();
  }, [postId]);

  if (!fullPost) {
    return <p>Post not found : O</p>;
  }

  const updateCount = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("Posts")
      .update({ upvoteCount: count + 1 })
      .eq("id", postId)
      .single();
  };

  const updateComments = async (event) => {
    event.preventDefault();

    let oldComments = fullPost.comments;
    if (oldComments == null) {
      oldComments = [];
    }
    oldComments.push(comment);
    console.log(`Preexisting comments: ${oldComments}`);

    const { data, error } = await supabase
      .from("Posts")
      .update({ comments: oldComments })
      .eq("id", postId);

    forceUpdate();
  };

  const handleChange = (event) => {
    setComment(event.target.value);
    console.log(`comment is ${comment}`);
  };

  return (
    <div className="FullPost">
      <h2>{fullPost.title}</h2>
      <h3>{fullPost.media}</h3>
      <img src={fullPost.picUrl} />
      <h3>{fullPost.content}</h3>
      <button onClick={updateCount}>Upvote!👍</button> <br /> <br />
      <h5>Comments</h5>
      {fullPost.comments && fullPost.comments.length > 0 ? (
        fullPost.comments.map((comment) => <ul>{comment}</ul>)
      ) : (
        <h5>Be the first to comment!</h5>
      )}
      <div className="commentBox">
        <form onSubmit={updateComments}>
          <label>Leave a Comment!</label>
          <br /> <br />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Loved the Post!"
          ></input>
          <input type="submit" value="Submit Comment" />
        </form>
      </div>
    </div>
  );
};
export default FullPost;
