import axios from "axios";
import React from "react";
import { useState, useRef } from "react/cjs/react.development";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs }) => {
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showBtn = useRef();

  const showMore = () => {
    setShow(show ? false : true);
    showBtn.current.innerText = show ? "show more" : "show less";
  };

  const likeClick = async () => {
    const token = "bearer " + JSON.parse(localStorage.getItem("user")).token;
    try {
      await axios.put(
        `/api/blogs/${blog._id}`,
        {
          likes: blog.likes === likes ? blog.likes + 1 : likes + 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLikes(likes + 1);
      console.log("Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    const token = "bearer " + JSON.parse(localStorage.getItem("user")).token;
    try {
      const response = await axios.delete(`/api/blogs/${blog._id}`, {
        headers: {
          Authorization: token,
        },
      });

      setBlogs(response.data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Deleted blog by ${blog.user.name || blog.user.username}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
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

  return (
    <div className="blog">
      <span className="titleSpan">Title: {blog.title} </span>
      <button onClick={showMore} ref={showBtn}>
        show more
      </button>
      <br />
      <div style={{ display: show ? "block" : "none" }}>
        <span>Author: {blog.author}</span>
        <br />
        <span>Url: {blog.url}</span>
        <br />
        <span>
          Likes: {likes} <button onClick={likeClick}>like</button>
        </span>{" "}
        <br />
        <span>User: {blog.user.name || blog.user.username}</span>
        <br />
        <br />
        <button onClick={deleteBlog}>remove</button>
      </div>
      <br />
      <br />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blog;
