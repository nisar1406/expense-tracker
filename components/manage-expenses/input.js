import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ style, label, invalid, textInputConfig }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig?.multiLine) {
    inputStyles.push(styles.multiLineInput);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid ? styles.inValidLabel : null]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    minWidth: "100%",
  },
  multiLineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    color: GlobalStyles.colors.error50,
  },
});

export default Input;
