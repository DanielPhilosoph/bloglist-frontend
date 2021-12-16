import { useRef } from "react/cjs/react.development";
import React from "react";
import PropTypes from "prop-types";

const AddBlog = (props) => {
  const title = useRef();
  const author = useRef();
  const url = useRef();

  const resetFields = () => {
    title.current.value = "";
    author.current.value = "";
    url.current.value = "";
  };

  const onCreateClick = () => {
    const isAdded = props.newBlogClick(
      title.current.value,
      author.current.value,
      url.current.value
    );
    if (isAdded) {
      resetFields();
    }
  };

  return (
    <form style={{ display: props.showForm ? "block" : "none" }}>
      <span>Title: </span>
      <input
        type="text"
        placeholder="Title"
        ref={title}
        id="createTitle"
      ></input>
      <br />
      <span>Author: </span>
      <input
        type="text"
        placeholder="Author"
        ref={author}
        id="createAuthor"
      ></input>
      <br />
      <span>URL: </span>
      <input type="text" placeholder="URL" ref={url} id="createUrl"></input>
      <br />
      <br />
      <button className="createButton" type="button" onClick={onCreateClick}>
        create
      </button>
    </form>
  );
};

AddBlog.propTypes = {
  showForm: PropTypes.bool.isRequired,
  newBlogClick: PropTypes.func.isRequired,
};

export default AddBlog;
