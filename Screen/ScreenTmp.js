// ScreenTmp.js
import React from "react";
import { View, Text, Button } from "react-native";

const ScreenTmp = ({ navigation, screenId }) => {
  return (
    <View>
      <Text>{`Screen ${screenId}`}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ScreenTmp;
