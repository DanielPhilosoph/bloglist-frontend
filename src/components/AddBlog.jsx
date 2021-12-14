import axios from "axios";
import { useRef } from "react/cjs/react.development";
import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types";

const AddBlog = (props) => {
  const title = useRef();
  const author = useRef();
  const url = useRef();

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

        // Update blogs & close new blog form
        props.setBlogs(response.data);
        props.setShowForm(false);

        // Display massage
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Added blog ${title.current.value}!`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset fields
        title.current.value = "";
        author.current.value = "";
        url.current.value = "";
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Missing field",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form style={{ display: props.showForm ? "block" : "none" }}>
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
  );
};

AddBlog.propTypes = {
  showForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default AddBlog;
