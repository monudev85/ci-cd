import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { enableAppLock } from '../utils/enableBiometricAuthentication';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

const LockScreen = ({navigation}:any) => {
  const [isLocked, setIsLocked] = useState(true);
  const screenId = "KnoBee"; // Your screen ID here
  const enableAppLock  = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      const storedToken = await AsyncStorage.getItem('token');
      if (available && biometryType) {
        const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to enable screen lock' });
        
        if (success && storedToken) {
          navigation.navigate('TabNavigatorScreen')
        } else if(!storedToken && success) {
           navigation.navigate('Login')
        }
      } else if(storedToken){
        navigation.navigate('TabNavigatorScreen')
      } else if(!storedToken){
        navigation.navigate('Login')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to enable screen lock. Please try again later.');
    }
  };

  useEffect(() => {
    enableAppLock()// Assuming enableAppLock is a function defined in biometricUtils
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={{ height: 80, width: 80 }}
          source={{
            uri:
              'https://w7.pngwing.com/pngs/972/542/png-transparent-padlock-security-visio-purple-violet-logo.png',
          }}
        />
        <Text style={styles.lockedText}>KnoBee Locked</Text>
        <Text style={styles.unlockText}>
          Unlock with screen ID to open {screenId}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>enableAppLock()}>
        <Text style={styles.buttonText}>Use Screen ID</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 50,
  },
  lockedText: {
    fontSize: 24,
    marginBottom: 20,
  },
  unlockText: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#551d7d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LockScreen;
