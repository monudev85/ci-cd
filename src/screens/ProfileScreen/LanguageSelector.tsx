import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const languages = [
    { name: 'English', flagUri: 'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg'},
    { name: 'Chinese', flagUri: 'https://w7.pngwing.com/pngs/221/273/png-transparent-flag-of-china-chinese-communist-revolution-symbol-chinese-flag-border-miscellaneous-floating-thumbnail.png' },
    { name: 'Korean', flagUri: 'https://e7.pngegg.com/pngimages/794/125/png-clipart-flag-of-south-korea-national-flag-flag-of-north-korea-flag-miscellaneous-flag.png' },
    { name: 'Hindi', flagUri: 'https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=ais' },
    // Add more languages and flag URIs as needed
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setModalVisible(false);
    // Implement logic to switch language
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Image source={{ uri: languages.find(lang => lang.name === selectedLanguage)?.flagUri }} style={styles.flag} />
        <Text style={styles.selectedLanguage}>{selectedLanguage}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {languages.map((lang, index) => (
            <TouchableOpacity key={index} onPress={() => handleLanguageChange(lang.name)}>
              <View style={styles.languageItem}>
                <Image source={{ uri: lang.flagUri }} style={styles.flag} />
                <Text>{lang.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  selectedLanguage: {
    fontSize: 16,
    color:'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default LanguageSelector;
