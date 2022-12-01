import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../ui/button";
import Input from "../manage-expenses/input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    confirmPassword: {
      value: "",
      isValid: true,
    },
  });

  function updateInputValueHandler(type, value) {
    setFormData((oldData) => ({
      ...oldData,
      [type]: { value, isValid: true },
    }));
  }

  function submitHandler() {
    let { email, password, confirmPassword } = formData;
    email = email?.value?.trim();
    password = password?.value?.trim();
    confirmPassword = confirmPassword?.value.trim();

    const isEmailValid = email.includes("@");
    const isPasswordValid = password?.length > 6;
    const arePasswordEqual = password === confirmPassword;

    if (!isEmailValid || !isPasswordValid || (!isLogin && !arePasswordEqual)) {
      setFormData((oldData) => ({
        email: { ...oldData.email, isValid: isEmailValid },
        password: { ...oldData.password, isValid: isPasswordValid },
        confirmPassword: {
          ...oldData.confirmPassword,
          isValid: arePasswordEqual,
        },
      }));
      return;
    }
    onSubmit({
      email,
      password,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          invalid={!formData.email.isValid}
          textInputConfig={{
            keyboardType: "mail-address",
            value: formData.email.value,
            onChangeText: updateInputValueHandler.bind(this, "email"),
          }}
        />
        {isLogin && (
          <View style={styles.inputContainer}>
            <Input
              label="Password"
              invalid={!formData.password.isValid}
              textInputConfig={{
                keyboardType: "default",
                value: formData.password.value,
                onChangeText: updateInputValueHandler.bind(this, "password"),
                secureTextEntry: true,
              }}
            />
            {/* <Pressable style={styles.showPassword}>
              <Ionicons name="eye-off" size={24} color="white" />
            </Pressable> */}
          </View>
        )}
        {!isLogin && (
          <>
            <Input
              label="Password"
              invalid={!formData.password.isValid}
              textInputConfig={{
                keyboardType: "default",
                value: formData.password.value,
                onChangeText: updateInputValueHandler.bind(this, "password"),
              }}
            />
            <Input
              label="Confirm Password"
              invalid={!formData.confirmPassword.isValid}
              textInputConfig={{
                keyboardType: "default",
                value: formData.confirmPassword.value,
                onChangeText: updateInputValueHandler.bind(
                  this,
                  "confirmPassword"
                ),
              }}
            />
          </>
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  showPassword: {
    marginRight: 200,
    position: "relative",
  },
  inputContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    padding: 14,
    width: "90%",
  },
});
