import axios from "axios";
import { baseURL } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("rasheed");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
