import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import getAll from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import axios from "axios";

const BlogsList = (props) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const title = useRef();
  const author = useRef();
  const url = useRef();
  const massage = useRef();

  useEffect(() => {
    getAll(props.token).then((blogs) => setBlogs(blogs));
  }, [props.token]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const newBlogClick = async () => {
    try {
      if (title.current.value && author.current.value && url.current.value) {
        const token =
          "bearer " + JSON.parse(localStorage.getItem("user")).token;
        const response = await axios.post(
          "/api/blogs",
          {
            title: title.current.value,
            author: author.current.value,
            url: url.current.value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Update blogs
        setBlogs(response.data);

        // Display massage
        setShow(true);
        massage.current.innerText = `Added blog ${title.current.value}!`;

        // Reset fields
        title.current.value = "";
        author.current.value = "";
        url.current.value = "";

        // Remove massage
        setTimeout(() => {
          massage.current.innerText = "";
          setShow(false);
        }, 5000);
      } else {
        console.log("missing field");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>blogs</h1>
      <h3>{props.username} has logged in</h3>
      <p
        ref={massage}
        className="massage"
        style={{ display: show ? "block" : "none" }}
      ></p>
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
      <form>
        <span>Title: </span>
        <input type="text" placeholder="Title" ref={title}></input>
        <br />
        <span>Author: </span>
        <input type="text" placeholder="Author" ref={author}></input>
        <br />
        <span>URL: </span>
        <input type="text" placeholder="URL" ref={url}></input>
        <br />
        <br />
        <button type="button" onClick={newBlogClick}>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogsList;
