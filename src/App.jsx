import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import DetailView from "./pages/DetailView";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useRoutes,
} from "react-router-dom";
import { supabase } from "./client.js";
import CreatePost from "./pages/CreatePost";
import ReadPosts from "./pages/ReadPosts";
import EditPost from "./pages/EditPost.jsx";

function App() {
  const [posts, setPosts] = useState([]);

  //Use effect to fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Posts").select();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new"> New Post</Link>
        </nav>
        <div className="header">
          <h1>🌹Romance Blog🌹</h1>
          <p>
            Do you LOVE love? Is Valentine's Day your favorite holiday? Do you
            gush at rom coms, love songs, or romance novels? If so, RoseHub is
            the place for you! RoseHub is a place for romance enthusiasts to
            unite and discuss various romantic media!
          </p>
        </div>
        <Routes>
          <Route path="/" element={<ReadPosts data={posts} />} />
          <Route path="/new" element={<CreatePost />} />
          <Route
            path="/postDetails/:id"
            element={<DetailView />}
          />
          <Route path="/edit/:id" element={<EditPost data={posts}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
