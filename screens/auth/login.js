import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/auth/auth-content";
import Loader from "../../components/ui/loader";
import { AuthContext } from "../../store/auth-context";
import { login } from "../../api/auth";

const LoginScreen = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      authContext.authenticate(response);
      // navigation.navigate("ExpensesOverview");
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      Alert.alert(
        "Authentication failed, please try again with appropriate credentials"
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
