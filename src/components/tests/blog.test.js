import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
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

  test("blog can display url and likes", () => {
    const blog = {
      title: "test title",
      author: "test author",
      user: { username: "test username" },
      url: "test url",
      likes: 10,
    };

    const component = render(<Blog blog={blog} setBlogs={() => {}} />);

    const showBtn = component.container.querySelector(".showBtn");
    fireEvent.click(showBtn);

    const infoDiv = component.container.querySelector(".blogInfo");
    expect(infoDiv).toHaveStyle("display: block;");

    const likesSpan = component.container.querySelector(".likes");
    const urlSpan = component.container.querySelector(".url");
    expect(likesSpan).toHaveTextContent("Likes: 10");
    expect(urlSpan).toHaveTextContent("Url: test url");
  });

  test("clicking the twice on the like button will calls event handler twice", () => {
    const blog = {
      title: "test title",
      author: "test author",
      user: { username: "test username" },
      url: "test url",
      likes: 10,
    };

    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={blog} likeClick={mockHandler} setBlogs={() => {}} />
    );

    const showBtn = component.container.querySelector(".showBtn");
    fireEvent.click(showBtn);

    const likeButton = component.container.querySelector(".likeButton");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
