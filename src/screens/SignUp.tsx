import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Linking,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import {
  MobileNumberError,
  PrivacyPolicyError,
  alreadyExistUser,
  otpFailed,
  otpTechnicalError,
} from "../data/ErrorMessages";
import { LocalizationContext } from "../components/Translation";
import Signupimage from "../assets/icons/Signupimage";

interface Country {
  id: string;
  sortname: string;
  name: string;
  phonecode: string;
  pattern: string;
  flagUrl: string;
}

export default function SignUpScreen({ navigation }: any) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("91");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAgreementChecked, setAgreementChecked] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [apiOtp, setApiOtp] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const otpBoxes = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [isError, setIsError] = useState(false);


  const { translations, initializeAppLanguage } =
    useContext(LocalizationContext);
  initializeAppLanguage(); // Initialize language context



  const handleMobileNumberChange = (number: string) => {
    setMobileNumber(number);
  };
  useEffect(() => {
    const mobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const validateError = mobileNumberRegex.test(mobileNumber);
    if (!validateError || !mobileNumber.length) {
      setMobileNumberError(MobileNumberError);
      setIsDisabled(true);
    } else {
      setMobileNumberError("");
      setIsDisabled(false);
    }
  }, [mobileNumber]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  // country code functon =======start=========================

  const fetchCountryData = async () => {
    try {
      const response = await fetch("http://192.168.1.18/country");
      if (response.ok) {
        const data = await response.json();
        setCountries(data.data);
      } else {
        Alert.alert("Failed to fetch country data");
      }
    } catch (error) {
      console.log(error,"Error country");
      Alert.alert("ERROR","Something went wrong please try again after sonetime!!!!jhjhjj");
    }
  };
  const focusNextBox = (index: number) => {
    const nextBox = otpBoxes[index + 1]?.current;
    if (nextBox) {
      nextBox.focus();
    }
  };
  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      const prevBox = otpBoxes[index - 1]?.current;
      if (prevBox) {
        prevBox.focus();
      }
    }
  };

  const handleChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    focusNextBox(index);
  };

  const handleNext=()=>{

    if (otpValues.every((val) => val !== "")) {
      const enteredOTP = parseInt(otpValues.join(""), 10);
      if (enteredOTP === apiOtp && !isError && !mobileNumberError) {
        navigation.navigate("completeProfile",{selectedCountry,mobileNumber} );
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  }
  // country code functon ============end====================

  //====================== otp code function====start===========================

  const fetchotp = async () => {
    if (!mobileNumberError) {
      if (!isAgreementChecked) {
        // Show error message for unchecked agreement
        Alert.alert("Error", PrivacyPolicyError);
        return;
      }
      try {
        const requestBody = {
          mobile: mobileNumber,
          countryCode: selectedCountry,
          otpCheck:1
        };
        const response = await fetch(`http://192.168.1.18/user/checkOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          const apiotp = data.otp;
          console.log(data);
         
          if (data.exists === 0) {
            setShowOtp(true);
            setApiOtp(apiotp)
          } else {
            Alert.alert(alreadyExistUser);
          }
          // navigate to the OTP verification screen
        } else {
          Alert.alert("Error", otpFailed);
          // display an error message to the user
        }
      } catch (error) {
        Alert.alert("Error", otpTechnicalError);
      }
    } else {
      setMobileNumberError(mobileNumberError);
    }
  };
  //====================== otp code function===end============================

  const handleCountrySelection = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setModalVisible(false);
  };

  const handleTextInputPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAgreementCheck = () => {
    setAgreementChecked(!isAgreementChecked);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{ alignItems: "center", marginTop:25 }}>
            <Signupimage></Signupimage>
          </View>
<ScrollView>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 30,
              marginTop: 0,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "center" }}
            >
              
              <Text style={styles.title}>{translations["signup.title"]}</Text>
              
            </View>

            <View>
              <View style={styles.textInputContainer}>
                <TouchableOpacity disabled={showOtp}  onPress={handleTextInputPress}>
                  <View style={[styles.textInputWrapper,apiOtp && { backgroundColor: '#c2c0c0' }]}>
                    <Text style={styles.countryCodeText}>
                      {"+" + selectedCountry}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TextInput
                  style={[styles.textInput1,,apiOtp && { backgroundColor: '#c2c0c0' }]}
                  keyboardType="number-pad"
                  placeholder={translations["signup.mobile_no"]}
                  placeholderTextColor="gray"
                  onChangeText={handleMobileNumberChange}
                  editable={!showOtp}
                />
              </View>
              {mobileNumberError && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginLeft: 30,
                    marginTop: 10,
                  }}
                >
                  {translations["signup.mobile_no_not_valid"]}
                </Text>
              )}
             {apiOtp &&<View style={styles.container1}>
                {otpBoxes.map((ref, index) => (
                  <TextInput
                    key={index}
                    ref={ref}
                    style={styles.input}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      handleChange(value, index);
                    }}
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(index, nativeEvent.key)
                    }
                  />
                ))}
              </View>}
              {isError && apiOtp && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Please enter valid OTP</Text>
                </View>
              )}

              {apiOtp && <Text style={styles.nootp}>Didn't receive the code?</Text>}

              {apiOtp && <TouchableOpacity
                onPress={() => {
                  fetchotp();
                }}
              >
                <Text style={styles.sendagain}>Send Again</Text>
              </TouchableOpacity>}
            </View>

            <View>
             {!apiOtp && <View style={styles.agreementContainer}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={handleAgreementCheck}
                    style={styles.radioButton}
                  >
                    {isAgreementChecked && (
                      <View style={styles.radioInnerCircle} />
                    )}
                  </TouchableOpacity>
                  <Text>
                    {translations["signup.registering_you_agree_to_the"]}{" "}
                    <Text
                      onPress={() =>
                        handleLinkPress("https://knobee.app/terms.html")
                      }
                      style={styles.linkText}
                    >
                      {translations["signup.terms"]}
                      {"\n"}
                    </Text>
                    <Text
                      onPress={() =>
                        handleLinkPress("https://knobee.app/terms.html")
                      }
                      style={styles.linkText}
                    >
                      {translations["signup.privacy_policy"]}
                    </Text>
                  </Text>
                </View>
              </View>}

              {/* Button container  */}

              <View style={styles.buttonContainer}>
                {!apiOtp &&
                <TouchableOpacity
                  style={styles.button}
                  disabled={isDisabled}
                  onPress={() => {
                    fetchotp();
                  }}
                >
                  <Text style={styles.buttonText}>
                    {translations["signup.sent_OTP"]}
                  </Text>
                </TouchableOpacity>}
                {apiOtp && <TouchableOpacity
                  style={styles.button}
                  disabled={isDisabled}
                  onPress={() => 
                      handleNext()
                  }
                >
                  <Text style={styles.buttonText}>
                    {'Next'}
                  </Text>
                </TouchableOpacity>}
                
              </View>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:10,flexDirection:'row'}}>
               <Text style={{color:'black', fontSize:14}}>Already have account? </Text> 
               <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={{color:'rgba(0, 91, 158, 1)'}}>Login</Text></TouchableOpacity>
                </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={countries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.countryOption}
                        onPress={() => handleCountrySelection(item.phonecode)}
                      >
                        <Image
                          source={{ uri: item.flagUrl }}
                          style={styles.flagImage}
                        />
                         <View style={{ width:60, alignItems:'center'}}>
                        <Text
                          style={{ marginRight:10,alignItems:'flex-end' }}
                        >{`+${item.phonecode}`}</Text></View>
                        <View style={{ width:150, alignItems:'center'}}>
                        <Text style={{alignItems:'flex-end'}}>{item.name}</Text></View>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          </ScrollView>
        </View>
        </View>
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  nootp: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
  },
  sendagain: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#4591F7",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
  agreementContainer: {
    flexDirection: "column",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    height: 58,
  },

  button: {
    backgroundColor: "#005B9E",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    fontWeight: "400",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", // Center the text within the button
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: 53,
    height: 58,
    marginHorizontal: 5,
    textAlign: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4591F7",
    marginBottom: 2,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  linkText: {
    color: "#4591F7",
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4591F7",
  },
  agreementText: {
    fontSize: 14,
    color: "black",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#005B9E",
    paddingVertical: 20,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,

  },
  touchableContainer: {
    width: "20%",
    marginRight: 30,
    justifyContent: "center",
  },
  textInputWrapper: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    height: 53,
    marginRight: 10,
    ...Platform.select({
      ios: {
        flex: 0, // Apply flex only on iOS
      },
      android: {
        flex: 1, // Apply flex only on android
      },
    }),
  },

  flagImage: {
    width: 50,
    height: 20,
    marginRight: 10,
  },

  countryCodeText: {
    fontSize: 16,
    paddingVertical: 8,
    color: "black",
    marginRight: 20,
    marginLeft: 20,
  },

  textInput1: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 16,
    color: "black",
    paddingLeft: 10,
    borderRadius: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  countryOption: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
