import AuthContent from "../../components/auth/auth-content";
import { createUser } from "../../api/auth";
import Loader from "../../components/ui/loader";
import { useState } from "react";
import { Alert } from "react-native";

const SignupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await createUser(email, password);
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (e) {
      setIsLoading(false);
      Alert.alert("Could not create user, please try again");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
