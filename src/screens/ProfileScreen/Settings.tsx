import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, AppState, Switch } from 'react-native'; // Import Switch from react-native
import { ListItem, Text, Button } from 'react-native-elements';
import { LocalizationContext } from '../../components/Translation';
import { AuthContext } from '../../components/Authentication';

export default function Settings({ navigation }: any) {
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext);
  const { logout } = useContext(AuthContext);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [appLockEnabled, setAppLockEnabled] = useState(false); // State variable to track app lock

  initializeAppLanguage();

  const handleLanguageChange = (lang: string) => {
    setAppLanguage(lang);
    setShowLanguageModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const toggleAppLock = () => {
    setAppLockEnabled(!appLockEnabled); // Toggle app lock state
  };

  return (
    <View style={{ paddingTop: 30 }}>
      {/* Toggle for App Lock */}
      <View style={styles.toggleContainer}>
        <Text style={styles.language}>{translations['settings.app_lock']}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={appLockEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppLock}
          value={appLockEnabled}
        />
      </View>

      <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
        <Text style={styles.language}>
          {translations['settings.change_language']}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>logout()}>
        <Text style={styles.language}>
          {translations['settings.app_logout']}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLanguageModal}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {translations.getAvailableLanguages().map((currentLang, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => handleLanguageChange(currentLang)}
              >
                <Text>{currentLang}</Text>
              </ListItem>
            ))}
            <Button title="Cancel" onPress={() => setShowLanguageModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: "800",
    fontSize: 15
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
