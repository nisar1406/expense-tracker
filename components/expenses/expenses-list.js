import React from "react";
import { FlatList, View } from "react-native";
import ExpenseItem from "./expense-item";

const ExpensesList = ({ expenses }) => {
  const renderItems = ({ item }) => {
    return <ExpenseItem {...item} />;
  };

  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;
