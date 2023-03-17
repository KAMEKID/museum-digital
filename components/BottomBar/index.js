import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import  TabBar  from "./Tabbar";
import Home from "../Home";
import Quiz from "../Quiz";
import Profile from "../Profile";


export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative", justifyContent: "center" }}>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="screen1"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="screen2"
          component={Quiz}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="screen3"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
};
