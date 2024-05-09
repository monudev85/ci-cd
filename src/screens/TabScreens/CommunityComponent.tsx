// MainComponent.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';



export default function CommunintyComponent({navigation}: any){
  const handlePress = () => {
    // Navigate to the 'Home' screen when TouchableOpacity is pressed
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Commmunity Component</Text>
      {/* Additional content of your component */}
    </TouchableOpacity>
  );
};
