import axios from "axios";

const apiURL = "http://localhost:5001";

export const axiosOpen = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
