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
import { v4 as uuidv4 } from "uuid";
import { getRandomBase64 } from "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenMenu from "./Screen/ScreenMenu";
import ScreenHome from "./Screen/ScreenHome";
import ScreenTmp from "./Screen/ScreenTmp";
const Stack = createStackNavigator();

const App = () => {
  const generateRandomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [screens, setScreens] = useState([
    { id: generateRandomString(10), title: "ベンチプレス" },
    { id: generateRandomString(10), title: "pull up" },
  ]);

  // アプリ起動時に保存されたデータを読み込む;
  useEffect(() => {
    loadScreens();
  }, []);
  // スクリーンの読み込み;
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
  // 指定された桁数のランダムな文字列を生成する関数

  const addScreen = async (title) => {
    const newScreenId = generateRandomString(10);
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
    console.log(updatedScreens);
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
            name={screen.id} // 一意の名前に変更する
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
