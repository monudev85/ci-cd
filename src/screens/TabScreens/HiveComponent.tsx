// MainComponent.tsx

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import TabHeader from '../../components/TabHeader';
import FamilyTree from '../HiveScreens/FamilyTree';

const initialFamilyTree = {
  name: "John Doe",
  birthdate: "1980-01-01",
  gender: "Male",
  children: [
    {
      name: "Jack Doe",
      birthdate: "2010-08-20",
      gender: "Male",
      children: [],
    },
    {
      name: "Jill Doe",
      birthdate: "2012-11-25",
      gender: "Female",
      children: [],
    },
  ],
};


export default function HiveComponent({navigation}: any){
  const handlePress = () => {
    // Navigate to the 'Home' screen when TouchableOpacity is pressed
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TabHeader />
      <ScrollView>
        <FamilyTree></FamilyTree>
      </ScrollView>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
})