import { createContext, useReducer } from "react";

// export const DUMMY_EXPENSE = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 55.55,
//     date: new Date("2022-11-02"),
//   },
//   {
//     id: "e2",
//     description: "A pair of shirts",
//     amount: 21.55,
//     date: new Date("2022-10-02"),
//   },
//   {
//     id: "e3",
//     description: "Book",
//     amount: 9.55,
//     date: new Date("2022-10-22"),
//   },
//   {
//     id: "e4",
//     description: "TV",
//     amount: 89.55,
//     date: new Date("2022-10-15"),
//   },
// ];

export const ExpenseContext = createContext({
  expense: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (expenseId, { description, amount, date }) => {},
  deleteExpense: (expenseId) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((v) => v.id !== action.payload);

    default:
      return state;
  }
};
const ExpenseContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);
  const addExpense = (data) => {
    dispatch({ type: "ADD", payload: data });
  };
  const setExpenses = (data) => {
    dispatch({ type: "SET", payload: data });
  };
  const updateExpense = (id, data) => {
    dispatch({ type: "UPDATE", payload: { id, data } });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expenseState,
    addExpense,
    setExpenses,
    updateExpense,
    deleteExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
