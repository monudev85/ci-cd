import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ profilePhoto, name, onAudioCall, onVideoCall }:any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>

      {/* Back Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
      </TouchableOpacity>

      {/* Profile Photo */}
      <Image style={styles.profilePhoto} source={{ uri: profilePhoto }} />

      {/* Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Audio Call Icon */}
      <TouchableOpacity onPress={onAudioCall} style={styles.iconContainer}>
      </TouchableOpacity>

      {/* Video Call Icon */}
      <TouchableOpacity onPress={onVideoCall} style={styles.iconContainer}>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Customize the background color
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'space-between', // Align icons to the right
  },
  iconContainer: {
    marginRight: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ChatHeader;