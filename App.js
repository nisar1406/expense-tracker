import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

import ManageExpenses from "./screens/manage-expenses";
import RecentExpenses from "./screens/recent-expenses";
import AllExpenses from "./screens/all-expenses";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/ui/icon-button";
import ExpenseContextProvider from "./store/expense-context";
import LoginScreen from "./screens/auth/login";
import SignupScreen from "./screens/auth/signup";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Profile from "./screens/profile";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpenses")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MyProfile"
        component={Profile}
        options={{
          title: "My Profile",
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color, size }) => (
            // <AntDesign name="hourglass" size={size} color={color} />
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const ExpenseStack = () => (
  <ExpenseContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{
          headerShown: false,
          title: "Expenses Overview",
        }}
      />
      <Stack.Screen
        name="ManageExpenses"
        component={ManageExpenses}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  </ExpenseContextProvider>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: "Login",
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        title: "Create your account",
      }}
    />
  </Stack.Navigator>
);

const Navigation = () => {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <ExpenseStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        authContext.authenticate(JSON.parse(data));
      }
      setIsLoading(false);
    };
    getUserDataFromStorage();
  }, []);

  if (isLoading) {
    <AppLoading />;
  }

  return <Navigation />;
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
};

export default App;
