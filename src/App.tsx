import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HiveComponent from "./screens/TabScreens/HiveComponent";
import ProfileComponent from "./screens/TabScreens/ProfileComponent";
import ChatComponent from "./screens/TabScreens/ChatComponent";
import CommunintyComponent from "./screens/TabScreens/CommunityComponent";
// screens
import Home from "./screens/Home";
import SignUpScreen from "./screens/SignUp";
import LoginScreen from "./screens/Login";
import OtpScreen from "./screens/Otp";

import ImagePickerScreen from "./screens/ImagePicker";
import CompleteProfile from "./screens/CompleteProfile";
import CompleteProfileStep2 from "./screens/CompleteProfileStep2";
import ForgotPassword from "./screens/ForgotPassword";
import SignLoginHeader from "./components/LoginSignUpHeader";
// import TabNavigator from "./components/TabNavigator";
import FeedScreen from "./screens/HomeScreens/FeedScreen";
import FullScreenImage from "./screens/HomeScreens/FullScreenImage";
import FeedItem from "./screens/HomeScreens/FeedScreen";
import ShareMoments from "./screens/HomeScreens/ShareMoments";
import MainComponent from "./screens/TabScreens/MainComponent";
import Settings from "./screens/ProfileScreen/Settings";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ChatScreen from "./screens/ChatScreens/ChatScreen";
import Chat from "./screens/ChatScreens/Chat";
import HomeSvg from "./assets/icons/Home";
import HomeFill from "./assets/icons/HomeFill";
import Hive from "./assets/icons/Hive";
import HiveFill from "./assets/icons/HiveFill";
import Community from "./assets/icons/Community";
import CommunityFill from "./assets/icons/CommunityFill";
import ChatFill from "./assets/icons/ChatFill";
import ChatSvg from "./assets/icons/ChatSvg";
import ActiveUser from "./screens/HomeScreens/ActiveUsers";
import StoryViewer from "./screens/HomeScreens/StoryViewer";
import LockScreen from "./screens/LockScreen";
import { LocalizationProvider } from "./components/Translation";
import { AuthContext, AuthProvider } from "./components/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const FeedStack = createNativeStackNavigator();

const FeedStackScreen = () => (
  <LocalizationProvider>
    <AuthProvider>
  <FeedStack.Navigator>
    <FeedStack.Screen
      name="Home"
      component={MainComponent}
      options={{ headerShown: false }}
    />
    <FeedStack.Screen
      name="Stories"
      component={ActiveUser}
      options={{ headerShown: false }}
    />
    <FeedStack.Screen
      name="StoryViewer"
      component={StoryViewer}
      options={{ headerShown: false }}
    />
  </FeedStack.Navigator>
  </AuthProvider>
  </LocalizationProvider>
);

const ProfileStackScreen = () => (
  <LocalizationProvider>
    <AuthProvider>
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileComponent}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name="MainProfile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    ></ProfileStack.Screen>
  </ProfileStack.Navigator>
  </AuthProvider>
  </LocalizationProvider>
);

const ChatStackScreen = () => (
  <LocalizationProvider>
    <AuthProvider>
  <ChatStack.Navigator>
    <ChatStack.Screen
      name="ChatComponent"
      component={ChatComponent}
      options={{ headerShown: false }}
    />
    <ChatStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{ headerShown: false }}
    />
    <ChatStack.Screen
      name="Chat"
      component={Chat}
      options={{ headerShown: false }}
    ></ChatStack.Screen>
  </ChatStack.Navigator>
  </AuthProvider>
  </LocalizationProvider>
);

const TabNavigator = () => (
  <LocalizationProvider>
    <AuthProvider>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "black",
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconComponent;

        if (route.name === "Home") {
          iconComponent = focused ? <HomeFill /> : <HomeSvg />;
        } else if (route.name === "Hive") {
          iconComponent = focused ? <HiveFill /> : <Hive />;
        } else if (route.name === "Community") {
          iconComponent = focused ? <CommunityFill /> : <Community />;
        } else if (route.name === "Chat") {
          iconComponent = focused ? <ChatFill /> : <ChatSvg />;
        } else if (route.name === "Profile") {
          iconComponent = (
            <Image
              source={require("./assets/icons/profile.png")}
              height={30}
              width={30}
            />
          );
        }

        return iconComponent;
      },
    })}
  >
    {/* Define your screens */}
    <Tab.Screen name="Home" component={FeedStackScreen} />
    <Tab.Screen name="Hive" component={HiveComponent} />
    <Tab.Screen name="Community" component={CommunintyComponent} />
    <Tab.Screen name="Chat" component={ChatStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />
  </Tab.Navigator>
  </AuthProvider>
  </LocalizationProvider>
);

const App = () => {
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('saumya1',storedToken)
        if (storedToken) {
          console.log('saumya2',storedToken, initialRoute)
          setInitialRoute('TabNavigatorScreen'); // If token is present, set initial route to MainStack
        }else{
          console.log('lockscreen +2')
          setInitialRoute('lockScreen')
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    checkToken();
  }, []);
  
  return (
    <NavigationContainer>
      <LocalizationProvider>
      <AuthProvider>
     {initialRoute==='lockScreen' && <Stack.Navigator initialRouteName='lockScreen'>
        <Stack.Screen
        name="lockScreen"
        component={LockScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigatorScreen"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompleteProfileStep2"
          component={CompleteProfileStep2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedItem"
          component={(props: any) => (
            <FeedItem {...props} navigation={props.navigation} />
          )}
        />
        <Stack.Screen name="ProfileComponent" component={ProfileComponent} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="FullPostImage"
          component={FullScreenImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Image"
          component={ImagePickerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="completeProfile"
          component={CompleteProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="header"
          component={SignLoginHeader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainComponent"
          component={MainComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShareMoments"
          component={ShareMoments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatComponent"
          component={ChatComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stories"
          component={ActiveUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryViewer"
          component={StoryViewer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>}
      {initialRoute==='TabNavigatorScreen' && <Stack.Navigator initialRouteName='TabNavigatorScreen'>
        <Stack.Screen
        name="lockScreen"
        component={LockScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigatorScreen"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompleteProfileStep2"
          component={CompleteProfileStep2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedItem"
          component={(props: any) => (
            <FeedItem {...props} navigation={props.navigation} />
          )}
        />
        <Stack.Screen name="ProfileComponent" component={ProfileComponent} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="FullPostImage"
          component={FullScreenImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Image"
          component={ImagePickerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="completeProfile"
          component={CompleteProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="header"
          component={SignLoginHeader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainComponent"
          component={MainComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShareMoments"
          component={ShareMoments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatComponent"
          component={ChatComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stories"
          component={ActiveUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryViewer"
          component={StoryViewer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>}
      </AuthProvider>
      </LocalizationProvider>
    </NavigationContainer>
  );
};

export default App;
