import React from "react";
const Blog = ({ blog }) => (
  <div>
    <span>Title: {blog.title}</span>
    <br />
    <span>Author: {blog.author}</span>
    <br />
    <br />
  </div>
);

export default Blog;
