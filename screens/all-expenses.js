import { useContext } from "react";
import Expenses from "../components/expenses/expenses";
import { ExpenseContext } from "../store/expense-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpenseContext);
  return (
    <Expenses
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallBackText="No expenses found."
    />
  );
};

export default AllExpenses;
