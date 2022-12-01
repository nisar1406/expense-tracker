import axios from "axios";
import { getAuthenticationURL } from "../config/api-config";

export const getUserDetails = async (token) => {
  const { data } = await axios.post(getAuthenticationURL("lookup"), {
    idToken: token,
  });
  return data;
};
