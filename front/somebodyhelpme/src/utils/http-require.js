import axios from "axios";

export default axios.create({
  baseURL: "http://i02d110.p.ssafy.io:80/",
  headers: {
    "Content-type": "application/json"
  }
});