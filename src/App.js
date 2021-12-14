import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import BlogList from "./components/BlogsList.jsx";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage setToken={setToken} setUsername={setUsername} />
            }
          />

          <Route
            path={`/blogs`}
            element={<BlogList token={token} username={username} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
