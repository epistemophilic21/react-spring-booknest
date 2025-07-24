import axios from "axios";

export const postUrls = async (url, values) => {
  const response = await axios.post(url, values);
  return response;
};

export const postRegisterClient = async (values) => {
  const url = "http://localhost:8080/api/v1/addClient";
  const response = await postUrls(url, values);
  console.log(response.status);
};

export const postLoginClient = async (values) => {
  const url = "http://localhost:8080/api/v1/authLogin";
  const response = await postUrls(url, values);
  return response.data;
};
