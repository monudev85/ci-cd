// MainComponent.tsx

import React from 'react';
import { TouchableOpacity, Text,View } from 'react-native';
import ProfileScreen from '../ProfileScreen/ProfileScreen';



export default function ProfileComponent({navigation}: any){


  return (

      <ProfileScreen navigation={navigation}> </ProfileScreen>
  );
};
