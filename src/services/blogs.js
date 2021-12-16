import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
  const token1 = JSON.parse(localStorage.getItem("user")).token || token;
  const request = axios.get(baseUrl, {
    headers: { Authorization: `bearer ${token1}` },
  });
  const response = await request;
  return response.data;
};

export default getAll;
