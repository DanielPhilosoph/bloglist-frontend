import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
      console.log(error);
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

export default LoginPage;
