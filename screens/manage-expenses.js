import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExpenseContext } from "../store/expense-context";

import IconButton from "../components/ui/icon-button";
import { GlobalStyles } from "../constants/styles";
import Form from "../components/manage-expenses/form";
import { deleteExpense, storeExpense, updateExpense } from "../config/http";
import Loader from "../components/ui/loader";
import { AuthContext } from "../store/auth-context";

const ManageExpenses = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const expensesContext = useContext(ExpenseContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const expenseId = route?.params?.expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (v) => v.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, expenseId]);

  const confirmHandler = async (data) => {
    setIsLoading(true);
    try {
      if (expenseId) {
        await updateExpense(expenseId, data, authContext.token);
        expensesContext.updateExpense(expenseId, data);
      } else {
        const id = await storeExpense(data, authContext.token);
        expensesContext.addExpense({ ...data, id });
      }
      cancelHandler();
    } catch {
      setError("Could not save expense - please try after some time.");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(expenseId, authContext.token);
      expensesContext.deleteExpense(expenseId);
    } catch {
      setError("Could not delete the expense - please try after some time.");
      setIsLoading(false);
    }
    cancelHandler();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  return (
    <View style={styles.container}>
      <Form
        submitButtonLabel={expenseId ? "Update" : "Add"}
        defaultValues={selectedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />

      {expenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
    marginTop: 20,
  },
});

export default ManageExpenses;
