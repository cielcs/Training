// ScreenHome.js
import React from "react";
import { View, Text, Button } from "react-native";

const ScreenHome = ({ navigation }) => {
  return (
    <View>
      <Text>Screen Home</Text>
      <Button
        title="Go to Screen Menu"
        onPress={() => navigation.navigate("ScreenMenu")}
      />
    </View>
  );
};

export default ScreenHome;
