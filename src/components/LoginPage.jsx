import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

import Swal from "sweetalert2";

const LoginPage = (props) => {
  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const loginClick = async () => {
    try {
      const response = await axios.post("/api/login", {
        username: username.current.value,
        password: password.current.value,
      });

      props.setUsername(response.data.username);
      props.setToken(response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data));

      // Success! Go to blogs
      navigate(`/blogs`);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login to blog list app!</h1>
      <br />
      <form>
        <span>User name: </span>
        <input ref={username} type="text" placeholder="User name"></input>
        <br />
        <br />
        <span>Password: </span>
        <input ref={password} type="password" placeholder="Password"></input>
        <br />
        <br />
        <button type="button" onClick={loginClick}>
          login
        </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default LoginPage;
