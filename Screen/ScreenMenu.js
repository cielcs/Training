// ScreenMenu.js
import React, { useState, useEffect} from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenMenu = ({props}) => {

  const [newScreenTitle, setNewScreenTitle] = useState("");

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

  const handleAddScreen = () => {
    if (newScreenTitle.trim() !== "") {
      addScreen(newScreenTitle);
      setNewScreenTitle(""); // タイトル入力をリセットする
    } else {
      // タイトルが空の場合はアラートを表示するなどの処理を追加できます
      alert("Please enter a title for the new screen.");
    }
  };

  const handleDeleteScreen = async (screenId) => {
    try {
      // スクリーンを削除する処理
      await deleteScreen(screenId);
      // AsyncStorageにデータを保存する
      // （deleteScreen内で更新されたscreensを保存するため、ここでは更新の必要はありません）
    } catch (error) {
      console.error("Error deleting screen", error);
    }
  };

  const renderScreenItem = (screen) => {
    return (
      <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <Button
            title="Delete"
            onPress={() => handleDeleteScreen(screen.id)}
            color="red"
          />
        )}
      >
        <View style={styles.screenItem}>
          <Button
            title={screen.title}
            onPress={() => navigation.navigate(screen.id)}
          />
        </View>
      </Swipeable>
      </GestureHandlerRootView>
    );
  };
  return (
    <View style={styles.container}>
      <Text>Screen Menu</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNewScreenTitle(text)}
        value={newScreenTitle}
        placeholder="Enter title for new screen"
      />
      {screens.map((screen) => (
        <View key={screen.id}>{renderScreenItem(screen)}</View>
      ))}
      <Button title="Add" onPress={handleAddScreen} />
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  screenItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default ScreenMenu;
