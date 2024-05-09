// MainComponent.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ChatScreen from '../ChatScreens/ChatScreen';



export default function ChatComponent({navigation}: any){

  return (
      <ChatScreen navigation={navigation}></ChatScreen>

  );
};
