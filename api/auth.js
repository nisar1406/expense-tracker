import axios from "axios";
import { getAuthenticationURL } from "../config/api-config";

export const createUser = async (email, password) => {
  return await authenticate("signUp", email, password);
};

export const login = async (email, password) => {
  return await authenticate("signInWithPassword", email, password);
};

const authenticate = async (mode, email, password) => {
  const { data } = await axios.post(getAuthenticationURL(mode), {
    email,
    password,
    returnSecureToken: true,
  });
  return data;
};
