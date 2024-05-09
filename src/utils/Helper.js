import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Helper {


  // 20200529 JustCode: 
  // Get user language setting from AsyncStorage 
  static async getDeviceLanguageFromStorage() {
    try {
      let lang = await AsyncStorage.getItem('lang');
      if(lang && lang.length > 0)
        return lang;
      else
        return 'en'; // No language setting, default it to english
    }
    catch(error) {
      // Can't get the language setting, default it to english
      return 'en';
    }
  }

  static updateDeviceLanguageToStorage(lang) {
    try {
      AsyncStorage.setItem('lang', lang);
    }
    catch(error) { }
  }
}