// ScreenMenu.js
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenMenu = ({ navigation, screens, addScreen, deleteScreen }) => {
  const [newScreenTitle, setNewScreenTitle] = useState("");

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
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
