import axios from "axios";

const instance = axios.create({
  baseURL: "https://uditsolutions.in/mogachetest/public/api/",
});

export default instance;
