import { useContext, useEffect, useState } from "react";
import Expenses from "../components/expenses/expenses";
import Error from "../components/ui/error";
import Loader from "../components/ui/loader";
import { AuthContext } from "../store/auth-context";
import { ExpenseContext } from "../store/expense-context";
import { getDateDifference } from "../util/dates";
import { getExpenses } from "../config/http";

const RecentExpenses = () => {
  const authContext = useContext(AuthContext);
  const expensesContext = useContext(ExpenseContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getExpenses(authContext.token);
        expensesContext.setExpenses(expenses);
        setIsLoading(false);
      } catch {
        setError("Could not fetch data");
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, [getExpenses, authContext.token]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  const recentExpense = expensesContext.expenses.filter((v) => {
    const today = new Date();
    const date7DaysAgo = getDateDifference(today, 7);
    return v.date > date7DaysAgo;
  });

  return (
    <Expenses
      expenses={recentExpense}
      expensesPeriod="Last 7 days"
      fallBackText="No recent expenses for last 7 days."
    />
  );
};

export default RecentExpenses;
