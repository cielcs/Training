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
  Appearance, 
  useColorScheme,
} from "react-native";
import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { v4 as uuidv4 } from "uuid";
import { getRandomBase64 } from "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenMenu from "./Screen/ScreenMenu";
import ScreenHome from "./Screen/ScreenHome";
import ScreenTmp from "./Screen/ScreenTmp";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const [text, setText] = useState('');

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ScreenHome} 
        />
        <Tab.Screen  
          name="Menu"
          component={ScreenMenu}
        />
      </Tab.Navigator>
      {/* <Stack.Navigator>
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
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    backgroundColor: 'rgb(29, 161, 242)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  contentText: {
    color: 'white',
    fontSize: 22,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
