import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, Switch, StyleSheet } from "react-native";

const TagFilter = ({ visible, onClose }: any) => {
  const [isHiveToggle, setHiveToggle] = useState(false);
  const [isAllMatesToggle, setAllMatesToggle] = useState(false);

  const handleSkip = () => {
    onClose();
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>


          <View style={styles.toggleContainer}>
            <Text style={{padding:10}}>Hive </Text>
            <Switch value={isHiveToggle} onValueChange={() => setHiveToggle(!isHiveToggle)} />
          </View>


          <View style={styles.toggleContainer}>
            <Text style={{padding:10}}>All Mates</Text>
            <Switch value={isAllMatesToggle} onValueChange={() => setAllMatesToggle(!isAllMatesToggle)} />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleSkip} style={styles.button}>
              <Text>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContinue} style={styles.button}>
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width:300
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent:'space-between'
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default TagFilter;
