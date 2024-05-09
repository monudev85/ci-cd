import { Image } from "react-native";
import ProfileComponent from "../screens/TabScreens/ProfileComponent";
import ChatComponent from "../screens/TabScreens/ChatComponent";
import CommunintyComponent from "../screens/TabScreens/CommunityComponent";
import HiveComponent from "../screens/TabScreens/HiveComponent";
import MainComponent from "../screens/TabScreens/MainComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/ProfileScreen/Settings";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
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
  </ProfileStack.Navigator>
);

export default function TabNavigator({ navigation }: any) {
  return(
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      options={{
        headerShown: false,
        tabBarIcon: ({}) => (
          <Image source={require('../assets/icons/home.png')} height={30} width={30} />
        ),
      }}
      component={MainComponent}
    />
    <Tab.Screen
      name="Hive"
      options={{
        headerShown: false,
        tabBarIcon: ({}) => (
          <Image source={require('../assets/icons/hive.png')} height={30} width={30} />
        ),
      }}
      component={HiveComponent}
    />
    <Tab.Screen
      name="Community"
      options={{
        headerShown: false,
        tabBarIcon: ({}) => (
          <Image source={{uri:'https://www.freeiconspng.com/thumbs/community-icon/community-icon-6.png'}} height={30} width={30} />
        ),
      }}
      component={CommunintyComponent}
    />
    <Tab.Screen
      name="Chat"
      options={{
        headerShown: false,
        tabBarIcon: ({ }) => (
          <Image source={require('../assets/icons/chat.png')} height={30} width={30} />
        ),
      }}
      component={ChatComponent}
    />
    <Tab.Screen
      name="Profile"
      options={{
        headerShown: false,
        tabBarIcon: ({}) => (
          <Image source={require('../assets/icons/profile.png')} height={30} width={30} />
        ),
      }}
      component={ProfileComponent}
    />
  </Tab.Navigator>)
};
