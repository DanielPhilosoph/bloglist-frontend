import axios from "axios";
import React from "react";
import { useState, useRef } from "react/cjs/react.development";
const Blog = ({ blog }) => {
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
          likes: blog.likes + 1,
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
  return (
    <div>
      <span>
        Title: {blog.title}{" "}
        <button onClick={showMore} ref={showBtn}>
          show more
        </button>
      </span>
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
      </div>
      <br />
      <br />
    </div>
  );
};

export default Blog;
