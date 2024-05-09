// tagpeople.tsx

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TagPeopleHead() {
  const navigation= useNavigation()
  return (
  <SafeAreaView>
      <View style={styles.container}>
       <TouchableOpacity
        style={{justifyContent:'flex-start'}} >
        <Image style={styles.arrowIcon} source={require('../assets/images/ep_back.png')}></Image>
       </TouchableOpacity>
       <View style={{justifyContent:'center', alignItems:'center'}}>
       <Text style={{fontSize:18}}>Tag People</Text>
       </View>
       <View><Text style={{color:'white'}}>Black</Text></View>
    </View><View style={styles.shadow} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    width: 25,
    height: 25,
  },
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical:10,
    paddingHorizontal:10,
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
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 23,
    height: 23,
    marginHorizontal: 10,
  },
});

