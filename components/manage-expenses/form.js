import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../ui/button";
import Input from "./input";

const Form = ({ defaultValues, submitButtonLabel, onSubmit, onCancel }) => {
  const [expenseValue, setExpenseValue] = useState({
    amount: {
      value: defaultValues?.amount ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date
        ? defaultValues.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (type, value) => {
    setExpenseValue((oldData) => ({
      ...oldData,
      [type]: { value, isValid: true },
    }));
  };

  const onSubmitHandler = () => {
    const data = {
      amount: +expenseValue.amount.value,
      date: new Date(expenseValue.date.value),
      description: expenseValue.description.value,
    };
    const isAmountValid =
      !isNaN(expenseValue.amount.value) && expenseValue.amount.value > 0;
    const isDateValid =
      new Date(expenseValue.date.value).toString() !== "Invalid Date";
    const isDescriptionValid =
      expenseValue?.description.value?.trim().length > 0;
    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setExpenseValue((oldData) => ({
        amount: { ...oldData.amount, isValid: isAmountValid },
        description: { ...oldData.description, isValid: isDescriptionValid },
        date: { ...oldData.date, isValid: isDateValid },
      }));
      return;
    }
    onSubmit(data);
  };

  const isFormValid =
    !expenseValue.amount.isValid ||
    !expenseValue.date.isValid ||
    !expenseValue.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.row}
          label="Amount"
          invalid={!expenseValue.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: expenseValue.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          invalid={!expenseValue.date.isValid}
          textInputConfig={{
            keyboardType: "default",
            placeholder: "YYYY-MM-DD",
            value: expenseValue.date.value,
            onChangeText: inputChangeHandler.bind(this, "date"),
            maxLength: 10,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!expenseValue.description.isValid}
        textInputConfig={{
          multiLine: true,
          autoCorrect: true,
          keyboardType: "default",
          value: expenseValue.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      {isFormValid && (
        <Text style={styles.errorText}>Invalid data! Please check</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={onSubmitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default Form;
