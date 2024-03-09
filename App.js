// App.js
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenMenu from "./Screen/ScreenMenu";
import ScreenHome from "./Screen/ScreenHome";
import ScreenTmp from "./Screen/ScreenTmp";
const Stack = createStackNavigator();

const App = () => {
  const [screens, setScreens] = useState([
    { id: "A", title: "AAtitle" },
    { id: "B", title: "BB" },
    { id: "C", title: "CC" },
  ]);

  // アプリ起動時に保存されたデータを読み込む
  useEffect(() => {
    loadScreens();
  }, []);
  // スクリーンの読み込み
  const loadScreens = async () => {
    try {
      const storedScreens = await AsyncStorage.getItem("screens");
      if (storedScreens !== null) {
        setScreens(JSON.parse(storedScreens));
      }
    } catch (error) {
      console.error("Error loading screens", error);
    }
  };

  const addScreen = async (title) => {
    const newScreenId = String.fromCharCode(65 + screens.length);
    const newScreen = { id: newScreenId, title: title };
    const updatedScreens = [...screens, newScreen];
    setScreens(updatedScreens);
    // AsyncStorageにデータを保存する
    try {
      await AsyncStorage.setItem("screens", JSON.stringify(updatedScreens));
    } catch (error) {
      console.error("Error saving screens", error);
    }
  };

  const deleteScreen = async (screenId) => {
    const updatedScreens = screens.filter((screen) => screen.id !== screenId);
    setScreens(updatedScreens);
    try {
      await AsyncStorage.setItem("screens", JSON.stringify(updatedScreens));
    } catch (error) {
      console.error("Error saving screens", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ScreenHome" component={ScreenHome} />
        {/* <Stack.Screen name="ScreenMenu" component={ScreenMenu} /> */}
        <Stack.Screen name="ScreenMenu" options={{ title: "ScreenMenu" }}>
          {(props) => (
            <ScreenMenu
              {...props}
              screens={screens}
              addScreen={addScreen}
              deleteScreen={deleteScreen}
            />
          )}
        </Stack.Screen>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.id}
            name={screen.id}
            options={{ title: screen.title }}
          >
            {(props) => <ScreenTmp {...props} screenId={screen.id} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
