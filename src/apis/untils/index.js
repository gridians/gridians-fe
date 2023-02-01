import axios from "axios";


export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://175.215.143.189:8080/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

