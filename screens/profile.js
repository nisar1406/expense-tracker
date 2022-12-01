import React, { useContext, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { GlobalStyles } from "../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import { getUserDetails } from "../api/user";
import { AuthContext } from "../store/auth-context";
import Input from "../components/manage-expenses/input";
import Loader from "../components/ui/loader";

const Profile = () => {
  const authContext = useContext(AuthContext);

  const [myDetails, setMyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log(authContext);

  useLayoutEffect(() => {
    const getUser = async () => {
      const { users } = await getUserDetails(authContext.token);
      console.log(users, "user");
      setMyDetails(users[0]);
      setIsLoading(false);
    };
    getUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const profilePic = myDetails.photoUrl
    ? { uri: myDetails.photoUrl }
    : require("../assets/blank-profile.png");

  return (
    <View style={styles.container}>
      <View style={styles.basicDetails}>
        <Image source={profilePic} style={styles.image} />
        <Text style={styles.title}>
          Hello{", "}
          {myDetails?.displayName ||
            authContext?.userData?.displayName ||
            "User"}
        </Text>
      </View>
      <View style={styles.email}>
        <Input
          style={styles.input}
          label="Email"
          textInputConfig={{
            editable: !myDetails?.emailVerified,
            value: myDetails?.email,
            // onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
        <View styles={styles.emailVerifiedLogo}>
          {myDetails?.emailVerified ? (
            <Octicons name="verified" size={24} color="green" />
          ) : (
            <Octicons name="unverified" size={24} color="red" />
          )}
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <AntDesign
          name="logout"
          size={24}
          color="white"
          onPress={authContext.logout}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  basicDetails: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    elevation: 4,
    borderRadius: 200,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
  },
  email: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  emailVerifiedLogo: {
    marginTop: 20,
    marginLeft: 20,
    flex: 1,
  },
  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutContainer: {
    color: "white",
    flex: 1,
    flexDirection: "row",
    marginTop: 350,
  },
  logoutText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 15,
  },
});

export default Profile;
