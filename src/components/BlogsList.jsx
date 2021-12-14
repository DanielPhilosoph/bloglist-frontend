import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import getAll from "../services/blogs";
import { useNavigate } from "react-router-dom";

const BlogsList = (props) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, [props.token]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>blogs</h2>
      <h3>{props.username} has logged in</h3>
      <p>
        <button onClick={logout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog._id.toString()} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
