import axios from "axios";
import { expensesURL } from "./api-config";

export const storeExpense = async (expenseData, token) => {
  const { data } = await axios.post(
    `${expensesURL}/expenses.json?auth=${token}`,
    expenseData
  );
  return data.name;
};

export const getExpenses = async (token) => {
  const { data } = await axios.get(
    `${expensesURL}/expenses.json?auth=${token}`
  );
  const expenses = [];
  for (const key in data) {
    const obj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    };
    expenses.push(obj);
  }
  return expenses;
};

export const updateExpense = (id, expenseData, token) => {
  return axios.put(
    `${expensesURL}/expenses/${id}.json?auth=${token}`,
    expenseData
  );
};

export const deleteExpense = (id, token) => {
  return axios.delete(`${expensesURL}/expenses/${id}.json?auth=${token}`);
};
