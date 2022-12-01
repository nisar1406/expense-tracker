import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./button";

const Error = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[[styles.text, styles.title]]}>
        Sorry, an error occurred.
      </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
});
