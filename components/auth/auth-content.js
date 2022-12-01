import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import AuthForm from "./auth-form";
import Button from "../ui/button";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler({ email, password }) {
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      {isLogin && <Text style={styles.text}>Please Login</Text>}
      <AuthForm isLogin={isLogin} onSubmit={submitHandler} />
      <View style={styles.buttons}>
        <Text style={styles.orText}>OR</Text>
        <Button onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in"}
        </Button>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    paddingTop: 150,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: GlobalStyles.colors.primary800,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  buttons: {
    marginTop: 15,
  },
  orText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});
