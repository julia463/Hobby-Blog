import React from "react";
import { useState } from "react";
import { supabase } from "../client";
import "./CreatePost.css";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "No title",
    media: "📚💗Book💗📚",
    content: "No content",
    picUrl:
      "https://img.freepik.com/free-vector/flat-design-wildflower-heart-background_23-2150435940.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699660800&semt=ais",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();
    await supabase
      .from("Posts")
      .insert({
        title: post.title,
        media: post.media,
        content: post.content,
        picUrl: post.picUrl,
      })
      .select();
    window.location = "/";
  };

  return (
    <div className="createPost">
      <h2>Create a new Post!</h2>
      <form onSubmit={createPost}>
        <label htmlFor="title">Post Title</label> <br />
        <input type="text" id="title" name="title" onChange={handleChange} />
        <br />
        <label htmlFor="media">Media Type</label>
        <br />
        <select id="media" name="media" onChange={handleChange}>
          <option value="novel">📚💗Book💗📚</option>
          <option value="movie">🎥💗Movie💗🎥</option>
          <option value="tv">📺💗TV Show💗📺</option>
          <option value="song">🎤💗Song💗🎤</option>
          <option value="album">🎶💗Album💗🎶</option>
          <option value="anime">🎎💗Anime💗🎎</option>
          <option value="manga">🗯️💗Manga💗🗯️</option>
        </select>
        <br />
        <label htmlFor="content">Post</label> <br />
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
      </form>
    </div>
  );
};
export default CreatePost;
