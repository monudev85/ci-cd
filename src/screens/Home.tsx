import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import {LocalizationContext} from '../components/Translation';

const Home = ({navigation}: any) => {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage(); // 1
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            width: 132,
            height: 34,
          }}
        />
      </View>

      <Text style={styles.headingtext}>
      {translations['welcome.title1']}{'\n'}{translations['welcome.title2']}
      </Text>

      <TouchableOpacity style={styles.signbtn} onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ fontSize: 16, color: 'white' }}>{translations['welcome.Signup_button']}</Text>
      </TouchableOpacity>

      <View style={styles.alreadyUserContainer}>
        <Text style={styles.alreadyUserText}>{translations['welcome.already_user']}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logInText}>{translations['welcome.login']}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.content} />
        <Image source={require('../assets/images/welcome.png')} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginHorizontal: 20, // Adjust this margin as needed
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 34,
  },
  headingtext: {
    fontSize: 36,
    color: '#000000',
    marginTop: 110, // Adjust this margin as needed
  },
  signbtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#4591F7',
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 40,
    marginTop: 25,
    paddingLeft: 20,
  },
  alreadyUserContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 20, // Adjust this margin as needed
  },
  alreadyUserText: {
    color: '#000000',
    fontSize: 16,
    marginRight: 8,
  },
  logInText: {
    color: '#4591F7',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 430,
    height: 430,
    alignSelf: 'center',
    marginBottom: 'auto',
  },
});

export default Home;
