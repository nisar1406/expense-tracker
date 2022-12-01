import { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const currentAppState = useRef(AppState.currentState);

  const [userData, setUserData] = useState();
  const [appState, setAppState] = useState(currentAppState.current);

  // TODO auto logout
  useEffect(() => {
    let interval = null;
    // console.log(userData);
    interval = setTimeout(() => {
      if (appState === "background" || appState === "inactive") {
        // logout();
      }
    }, 3600);
    console.log(appState);
    return () => {
      clearTimeout(interval);
    };
  }, [appState]);

  useEffect(() => {
    const handleChange = AppState.addEventListener("change", (changedState) => {
      currentAppState.current = changedState;
      setAppState(currentAppState.current);
    });

    return () => {
      handleChange.remove();
    };
  }, []);

  // console.log(appState);

  const authenticate = async (data) => {
    setUserData(data);
    await AsyncStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = async () => {
    console.log("calling logout");
    setUserData(null);
    await AsyncStorage.removeItem("userData");
  };

  const value = {
    token: userData?.idToken,
    userData,
    isAuthenticated: !!userData?.idToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
