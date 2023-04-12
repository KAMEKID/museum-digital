// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { BottomMenu } from './components/BottomBar'

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//             <SafeAreaProvider>

//                 <BottomMenu />

//             </SafeAreaProvider>
//         </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },

// });

import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./components/Home";
import Profile from "./components/Profile.js";
import Quiz from "./components/Quiz.js";
import DetailQuiz from "./components/DetailQuiz.js";
import hasil from "./components/hasil.js";
import DetailMuseum from "./components/DetailMuseum.js";

const homeName = "Home";
const quizName = "Quiz";
const detailQuizName = "DetailQuiz";
const profileName = "Profile";
const detailMuseumName = "DetailMuseum";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTrackList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailMuseum"
        component={DetailMuseum}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const QuizTrackList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailQuiz"
        component={DetailQuiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="hasil"
        component={hasil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconName2;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === quizName) {
              iconName = focused ? "book" : "book-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            return (
              <>
                <IonIcons name={iconName} size={size} color={color} />
                <MaterialCommunityIcons
                  name={iconName2}
                  size={size}
                  color={color}
                />
              </>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#4D4D4D",
          showLabel: false,
          inActiveColor: "#0D0D0D",
          tabStyle: { paddingTop: 20 },
        }}
      >
        <Tab.Screen
          name={homeName}
          component={HomeTrackList}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={quizName}
          component={QuizTrackList}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// import {
//   Provider as PaperProvider,
//   DarkTheme as PaperDarkTheme,
// } from 'react-native-paper';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import {
//   Text,
//   View,
//   Image,
//   Button,
//   TextInput,
//   TouchableHighlight,
//   StyleSheet,
// } from 'react-native';

// import Home from './components/Home.js';
// import Profile from './components/Profile.js';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <PaperProvider theme={PaperDarkTheme}>
//       <NavigationContainer theme={DarkTheme}>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Profile"
//             component={Profile}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default App;
