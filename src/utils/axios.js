import axios from "axios";

const apiURL = "https://mernifyu-task-manager-server-side.onrender.com";

export const axiosOpen = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
