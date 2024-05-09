import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import DeviceInfo from "react-native-device-info";

export default function ImagePickerScreen({ navigation, route }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [image, setImage] = useState<string>("");
  const bs = useRef<any>(null);
  const [deviceName, setDeviceName] = useState("");
  const [deviceVersion, setDeviceVersion] = useState<string>();

  const deviceInfo = async () => {
    let device = await DeviceInfo.getDeviceName();
    let systemVersion = await DeviceInfo.getSystemVersion();
    setDeviceName(device);
    setDeviceVersion(systemVersion);
  };

  useEffect(() => {
    deviceInfo();
    setImage(route?.params?.photo);
    GetLocation.getCurrentPosition()
      .then((location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
      })
      .catch((error) => {
        console.log(error,'location error factching');
        Alert.alert(
          "Technical Error",
          "Seems like a technical issue!! Please try after sometime!!"
        );
        
      });
  }, []);

  const handleContinue = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", image||'');

      // Append additional data to the FormData object
      formData.append("countrycode", route.params.CountryCode);
      formData.append("mobile", route.params.MobileNo);
      formData.append("firstname", route.params.FirstName);
      formData.append("lastname", route.params.LastName);
      formData.append("middlename", route.params.MiddleName);
      formData.append("gender", route.params.Gender);
      formData.append("dob", route.params.DOB);
      formData.append("refercode", route.params.ReferralCode);
      formData.append("email", route.params.Email);
      formData.append("knbid", route.params.KnobeeId);
      formData.append("password", route.params.Password);
      formData.append("lat", latitude);
      formData.append("long", longitude);
      formData.append("osVersion", deviceVersion);
      formData.append("deviceName", deviceName);
      // Add other properties as needed
      // countrycode,mobile,firstname,lastname,middlename,gender,dob,refercode,email,knbid,password,lat,long,osVersion,deviceName
      console.log(latitude,longitude,"form data");


      const response = await fetch("http://192.168.1.18/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
        
      });
      console.log(response,"  <------ ragister data");

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem("token", token);
        // Continue with navigation or any other logic
        console.log(data,"data saved");
        navigation.navigate("TabNavigatorScreen");
      } else {
        // Handle error
        Alert.alert("Failed to save user.");
      }
    } catch (error) {
      console.log(error,"user failed to ragister");
      Alert.alert("Error saving user.");
    }
  };

  const openImagePicker = () => {
    setModalVisible(true);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setImage(image.path);
      setModalVisible(false);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 133,
      height: 133,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
      setModalVisible(false);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 30,
              marginTop: 10,
            }}
          >
            <ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "CompleteProfileStep2" }],
                    })
                  }
                >
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={require("../assets/images/ep_back.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{"Complete your profile"}</Text>
                <Text style={{ color: "white" }}>close</Text>
              </View>
              <View style={styles.contentContainer1}>
                {/* Image Picker Box */}
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    style={styles.imagePickerContainer}
                    onPress={openImagePicker}
                  >
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={styles.selectedImage}
                      />
                    ) : (
                      <Image
                        source={require("../assets/images/camera.png")}
                        style={styles.cameraImage}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openImagePicker()}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: "20%",
                    }}
                  >
                    <Text style={{ color: "black" }}>Please upload your </Text>
                    <Text style={{ color: "black" }}>profile photo</Text>
                  </TouchableOpacity>
                </View>

                {/* Modal for Image Picker Options */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        style={styles.modalOption}
                        onPress={takePhotoFromCamera}
                      >
                        <Text style={styles.modalOptionText}>Take Photo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalOption}
                        onPress={choosePhotoFromLibrary}
                      >
                        <Text style={styles.modalOptionText}>
                          Choose from Library
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalOptionCancel}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.modalOptionTextCancel}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                {/* Button Section */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleContinue}
                  >
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={handleContinue}
                >
                  <Text style={{ color: "black" }}>Skip</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer1: {
    marginTop: 20,
  },
  imagePickerContainer: {
    height: 133,
    width: 133,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4591F7",
    borderRadius: 30,
    marginBottom: 90,
    backgroundColor: "#DBEAFF",
  },
  imagePickerText: {
    color: "#4591F7",
    fontSize: 16,
  },
  selectedImage: {
    borderWidth: 1,
    height: 133,
    width: 133,
    borderRadius: 30,
    backgroundColor: "white",
  },
  cameraImage: {
    width: 28,
    height: 28,
  },

  buttonContainer: {
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  button: {
    backgroundColor: "#005B9E",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    fontWeight: "400",
    // Set the width to half of the screen
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", // Center the text within the button
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
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,

    marginTop: 120,
  },
  title: {
    color: "black",
    fontSize: 20,
    marginBottom: 30,
  },
  textInputContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  touchableContainer: {
    width: "20%",
    marginRight: 30,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalOptionCancel: {
    paddingVertical: 15,
  },
  modalOptionText: {
    fontSize: 18,
    color: "#333",
  },
  modalOptionTextCancel: {
    fontSize: 18,
    color: "#FF0000",
    textAlign: "center",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#4591F7",
    marginRight: 30,
  },
  textInput1: {
    borderBottomWidth: 1,
    borderBottomColor: "#4591F7",
    fontSize: 16,
    marginBottom: 15,
    color: "black",
  },
});
