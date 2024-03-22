import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavi";
import ScreenTmp from "./Screen/ScreenTmp";
import ScreenMenu from "./Screen/ScreenMenu";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

/* <Stack.Navigator>
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
      </Stack.Navigator> */
