import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  // Function to handle logout
  const logout = async () => {
    try {
      // Remove token from storage
      await AsyncStorage.removeItem('token');
      // Clear token from state
      setToken(null);
      // Navigate to login/signup screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });// Assuming you have a 'Login' screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    // Check if token exists in AsyncStorage on component mount
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
