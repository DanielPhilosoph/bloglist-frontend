import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";

import Blog from "../Blog";

describe("blog component", () => {
  test("render a blog", () => {
    const blog = {
      title: "test title",
      author: "test author",
      user: { username: "test username" },
      url: "test url",
      likes: 10,
    };

    const component = render(<Blog blog={blog} setBlogs={() => {}} />);

    const titleSpan = component.container.querySelector(".titleSpan");

    expect(titleSpan).toHaveTextContent("Title: test title");
  });
});
