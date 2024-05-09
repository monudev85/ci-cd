import { Alert, AppRegistry } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

// Function to enable biometric authentication
export const enableAppLock  = async () => {
  console.log('>>>>>>>>>>>>>>>>',rnBiometrics)
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    console.log('>>>>>>>>>>>>>>>>',biometryType,available)
    if (available && biometryType) {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to enable screen lock' });
      if (success) {

        Alert.alert('Screen Lock Enabled', 'You have successfully enabled screen lock.');
      } else {

      }
    } else {
      Alert.alert('Biometric Authentication Unavailable', 'Biometric authentication is not available on this device.');
    }
  } catch (error) {
    // Handle errors
    console.error('Biometric authentication error:', error);
    Alert.alert('Error', 'Failed to enable screen lock. Please try again later.');
  }
};


