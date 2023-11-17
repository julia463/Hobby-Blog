import { useState, useEffect } from "react";
import React from "react";
import Post from "../components/Post";
import "./ReadPosts.css";
import { supabase } from "../client";

const ReadPosts = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const { data: posts } = props;
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortType, setSortType] = useState("time");

  useEffect(() => {
    setFilteredResults(posts);
  }, [posts]);

  const searchItems = (searchValue) => {
    console.log(searchValue.toLowerCase());
    console.log(posts);
    setSearchInput(searchValue);
    if (searchValue.trim() !== "") {
      const filteredData = posts.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(posts);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    try{
    if (sortType === "time") {
      //Make filtered Data be sorted by recent
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: true });

      setFilteredResults(data);
    } else {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order("upvoteCount", { ascending: false });

      setFilteredResults(data);
    }
  } catch(error){
    console.log("error")
  }
  };
  fetchData();
},[sortType]);

  return (
    <div className="ReadPosts">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => searchItems(e.target.value)}
      ></input>
      <label> Sort by: </label>
      <select id="sortBy" name="sortBy" onChange={(e) => setSortType(e.target.value)}>
        <option value="time">Recently Created</option>
        <option value="pop">Most Popular</option>
      </select>
      {posts && posts.length > 0 ? (
        filteredResults.map((post) => (
          <Post
            carry={post}
            key={post.id}
            id={post.id}
            created_at={post.created_at}
            title={post.title}
            name={post.name}
            media={post.media}
            content={post.content}
            picUrl={post.picUrl}
            upvoteCount={post.upvoteCount}
          />
        ))
      ) : (
        <h2>Blog is empty</h2>
      )}
    </div>
  );
};
export default ReadPosts;
