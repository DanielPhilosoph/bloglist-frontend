import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import getAll from "../services/blogs";
import { useNavigate } from "react-router-dom";
import AddBlog from "./AddBlog";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";

const BlogsList = (props) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAll(props.token).then((blogs) => setBlogs(blogs));
  });

  const likeClick = async (id, currentLikes) => {
    const token = "bearer " + JSON.parse(localStorage.getItem("user")).token;
    try {
      await axios.put(
        `/api/blogs/${id}`,
        {
          likes: currentLikes + 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setBlogs(
        blogs.map((blog) => {
          if (blog._id === id) {
            blog.likes++;
          }
          return blog;
        })
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Opps!`,
        text: "something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleForm = () => {
    setShowForm(showForm ? false : true);
  };

  const blogsToRender = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return blogs.map((blog) => (
      <Blog
        key={blog._id.toString()}
        blog={blog}
        setBlogs={setBlogs}
        likeClick={likeClick}
      />
    ));
  };

  const fireErrorMassage = (title, text) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const fireSuccessMassage = (title, text) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const newBlogClick = async (title, author, url) => {
    try {
      if (title && author && url) {
        const token =
          "bearer " + JSON.parse(localStorage.getItem("user")).token;
        const response = await axios.post(
          "/api/blogs",
          {
            title: title,
            author: author,
            url: url,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Update blogs & close new blog form
        setBlogs(response.data);
        setShowForm(false);

        // Display massage
        fireSuccessMassage(`Added blog ${title}!`);

        return true;
      } else {
        fireErrorMassage("Missing field");
        return false;
      }
    } catch (error) {
      console.log(error);
      fireErrorMassage(error.response);
      return false;
    }
  };

  return (
    <div className="container">
      <h1>blogs</h1>
      <h3>{props.username} has logged in</h3>
      <p>
        <button onClick={logout}>logout</button>
      </p>
      {blogsToRender()}
      <br />
      <br />
      <h2>Create new</h2>
      <br />
      <button onClick={toggleForm}>Create new blog</button>
      <br />
      <br />
      <AddBlog showForm={showForm} newBlogClick={newBlogClick} />
    </div>
  );
};

BlogsList.propTypes = {
  username: PropTypes.string,
  token: PropTypes.string,
};

export default BlogsList;
