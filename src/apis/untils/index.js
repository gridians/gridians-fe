import axios from "axios";


export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://58.231.19.218:8000",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

