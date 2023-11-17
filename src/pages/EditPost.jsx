import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./EditPost.css"

const EditPost = ({ data }) => {
  const { id } = useParams();
  const post = data.filter((item) => item.id === id)[0];


  const [updatedPost, setUpdatedPost] = useState(post);

  const updatePost = async (event) => {
    event.preventDefault();
    await supabase.from("Posts")
    .update(updatedPost).
    eq("id", id); 

    window.location = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prevChar) => ({
      ...prevChar,
      [name]: value,
    }));

    console.log(updatedPost);
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "./";
  };

  return (
    <div className="Post">
      <form onSubmit={updatePost}>
        <label htmlFor="title">Post Title</label> <br />
        <input type="text" name="title" onChange={handleChange} />{" "}
        <br />
        <label htmlFor="media">Media Type</label> <br />
        <select id="media" name="media" onChange={handleChange}>
          <option value="novel">📚💗Book💗📚</option>
          <option value="movie">🎥💗Movie💗🎥</option>
          <option value="tv">📺💗TV Show💗📺</option>
          <option value="song">🎤💗Song💗🎤</option>
          <option value="album">🎶💗Album💗🎶</option>
          <option value="anime">🎎💗Anime💗🎎</option>
          <option value="manga">🗯️💗Manga💗🗯️</option>
        </select>
        <label htmlFor="content">Post content</label> <br />
        <textarea
          id="content"
          name="content"
          placeholder="Post goes here"
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="picUrl">Picture Url? (optional)</label>
        <br />
        <input
          type="text"
          id="picUrl"
          name="picUrl"
          onChange={handleChange}
        ></input>
        <br /> <br />
        <input type="submit" value="Submit" />
        <br />
        <button onClick={deletePost}>Delete Post</button>
      </form>
    </div>
  );
};
export default EditPost;
