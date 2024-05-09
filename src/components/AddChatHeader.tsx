// Header.tsx

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareMoment from '../assets/icons/ShareMoment';
import Search from '../assets/icons/Search';
import Notification from '../assets/icons/Notification';
import AddChat from '../assets/icons/AddChat';
import Knobee from '../assets/icons/Knobee';

type HeaderProps = {
  // You can define any additional props you need
};

export default function AddChatHeader({ navigation }: any) {


  const handleInstagramIconPress =async () => {
    await AsyncStorage.removeItem('userToken');
    // Navigate to the login screen or any other screen
    navigation.navigate('Home'); 
    // Handle Instagram icon press
    // Example: navigate to the Instagram screen
    // navigation.navigate('InstagramScreen');
  };

  const handleSearchIconPress = () => {
    // Handle Search icon press
    // Example: navigate to the Search screen
    // navigation.navigate('SearchScreen');
  };

  const handleNotificationIconPress = () => {
    // Handle Notification icon press
    // Example: navigate to the Notification screen
    // navigation.navigate('NotificationScreen');
  };

  return (
    <SafeAreaView>

    <View style={styles.container}>
      {/* Left corner: Logo */}
    <Knobee style={{marginLeft:10}}></Knobee>
      {/* Right corner: Icons */}
      <View style={styles.iconsContainer}>

        <TouchableOpacity onPress={handleInstagramIconPress}>
         <AddChat style={{marginRight:12}}></AddChat>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleInstagramIconPress}>
         <ShareMoment style={{marginRight:12}}></ShareMoment>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={handleSearchIconPress}>
          <Search style={{marginRight:12}}></Search>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={handleNotificationIconPress}>
          <Notification></Notification>
        </TouchableOpacity> */}

      </View>
   
    </View>
    {/* <View style={styles.shadow} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom:5,
    paddingTop:15
  },
  shadow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  logo: {
    width: 132,
    height: 34,
    marginLeft:15
  },
  iconsContainer: {
    flexDirection: 'row',
padding:10
  },
  icon: {
    width: 23,
    height: 23,
    marginHorizontal: 10,
  },
});

