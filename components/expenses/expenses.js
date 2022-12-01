import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./expenses-list";
import ExpensesSummary from "./expenses-summary";

const Expenses = ({ expenses, expensesPeriod, fallBackText }) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses?.length > 0) {
    content = <ExpensesList expenses={expenses} periodName={expensesPeriod} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default Expenses;
