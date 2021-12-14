import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import getAll from "../services/blogs";
import { useNavigate } from "react-router-dom";
import AddBlog from "./AddBlog";

const BlogsList = (props) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAll(props.token).then((blogs) => setBlogs(blogs));
  }, [props.token]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleForm = () => {
    setShowForm(showForm ? false : true);
  };

  return (
    <div className="container">
      <h1>blogs</h1>
      <h3>{props.username} has logged in</h3>
      <p>
        <button onClick={logout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog._id.toString()} blog={blog} />
      ))}
      <br />
      <br />
      <h2>Create new</h2>
      <br />
      <button onClick={toggleForm}>Create new blog</button>
      <br />
      <br />
      <AddBlog
        showForm={showForm}
        setShowForm={setShowForm}
        setBlogs={setBlogs}
      />
    </div>
  );
};

export default BlogsList;
