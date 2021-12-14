import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (token) => {
  const token1 = JSON.parse(localStorage.getItem("user")).token || token;
  const request = axios.get(baseUrl, {
    headers: { Authorization: `bearer ${token1}` },
  });
  return request.then((response) => response.data);
};

export default getAll;
