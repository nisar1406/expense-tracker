export const API_KEY = "AIzaSyBjUYYbvh_7d1VxyE4Vg7_3WvRth8ukd1Q";

export const expensesURL =
  "https://react-native-learning-d93da-default-rtdb.firebaseio.com";

export const baseURL = `https://identitytoolkit.googleapis.com/v1/accounts:`;

export const getAuthenticationURL = (endPoint) => {
  return `${baseURL}${endPoint}?key=${API_KEY}`;
};
