import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import TabHeader from "../../components/TabHeader";

type Relation = {
  name: string;
  relation: string;
  profilePic?: string | null;
  children?: Relation[];
};

type Props = {};
type ModalContent = "addNetwork" | "imageSelector";

const FamilyTree: React.FC<Props> = () => {
  const [relations, setRelations] = useState<Relation[]>([
    {
      name: "Saumya Mishra",
      relation: "Me",
      profilePic:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    relation: "",
    mobileNumber: "",
    profilePic: "",
  });

  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const imageList = [
    { filename: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160_1280.png", relation: "Father" },
    { filename: "https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png", relation: "Mother" },
    { filename: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png", relation: "Brother" },
    { filename: "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_1280.png", relation: "Sister" },
    { filename: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_1280.png", relation: "Husband" },
    { filename: "https://cdn.pixabay.com/photo/2014/03/25/16/24/female-296989_1280.png", relation: "Wife" },
    { filename: "https://cdn.pixabay.com/photo/2024/01/16/18/33/ai-generated-8512823_1280.jpg", relation: "Son" },
    { filename: "https://cdn.pixabay.com/photo/2024/01/20/15/28/vietnam-8521286_1280.jpg", relation: "Daughter" },
  ];


  const addRelation = (relation: Relation) => {
    setRelations([...relations, relation]);
  };

  const openAddNetworkModal = (relation: string, profilePic: string) => {
    setSelectedRelation(relation);
    setSelectedImage(profilePic);
    setModalContent("addNetwork");
  };

  const openImageSelectorModal = () => {
    setModalContent("imageSelector");
  };

  const closeModal = () => {
    setModalContent(null);
    setSelectedImage(null);
    setSelectedRelation(null);
  };
  const saveNewRelation = () => {
    addRelation({
      name: newContact.name,
      relation: selectedRelation || newContact.relation,
      profilePic: selectedImage || newContact.profilePic,
      children: [],
    });

    closeModal();
    setNewContact({
      name: "",
      relation: "",
      mobileNumber: "",
      profilePic: "",
    });
  };


  const renderModalContent = () => {
    switch (modalContent) {
      case "addNetwork":
        return (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.popupImage}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newContact.name}
                onChangeText={(text) =>
                  setNewContact({ ...newContact, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Relation"
                value={selectedRelation || newContact.relation}
                onChangeText={(text) =>
                  setNewContact({ ...newContact, relation: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={newContact.mobileNumber}
                onChangeText={(text) =>
                  setNewContact({ ...newContact, mobileNumber: text })
                }
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveNewRelation}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "imageSelector":
        return (
          <View style={styles.imageSelectorContainer}>
            <TabHeader />
            <ScrollView contentContainerStyle={{ flexDirection: "column" }}>
              <View style={styles.imageSelectorContent}>
                {imageList.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      openAddNetworkModal(image.relation, image.filename)
                    }
                  >
                    <View style={styles.imageSelectorItem}>
                      <Image
                        source={{ uri: image.filename }}
                        style={styles.imageSelectorImage}
                      />
                      <Text style={styles.imageSelectorText}>
                        {"+ " + image.relation}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );
      default:
        return null;
    }
  };

  const renderPerson = (
    relation: Relation,
    depth: number,
    isInitialUser: boolean = false
  ) => {
    const flexDirection = isInitialUser ? "column" : "row";
    const alignItems = isInitialUser ? "center" : "center";
    const justifyContent = isInitialUser ? "center" : "center";
  
    const marginLeft = isInitialUser ? 0 : 20 * depth;
  
    return (
      <View
        key={relation.name}
        style={{
          ...styles.personContainer,
          flexDirection,
          alignItems,
          justifyContent,
          marginLeft,
        }}
      >
        {relation.relation !== 'Son' && relation.relation !== 'Daughter' && (
          <TouchableOpacity
            onPress={() => {
              // Handle the press event for other relations
            }}
          >
            <View style={styles.profileContainer}>
              {relation.profilePic && (
                <Image
                  source={{
                    uri: relation.profilePic,
                  }}
                  style={styles.profilePic}
                />
              )}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.relationText}>{relation.relation}</Text>
                <Text style={styles.nameText}>{relation.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
  
        {(relation.relation === 'Son' || relation.relation === 'Daughter') && (
          <TouchableOpacity
            style={{ flexDirection: 'column', alignItems: 'center' }}
            onPress={() => {
              // Handle the press event for Son or Daughter
            }}
          >
            <View style={styles.profileContainer}>
              {relation.profilePic && (
                <Image
                  source={{
                    uri: relation.profilePic,
                  }}
                  style={styles.profilePic}
                />
              )}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.relationText}>{relation.relation}</Text>
                <Text style={styles.nameText}>{relation.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {relations.map((relation, index) =>
        renderPerson(relation, 0, index === 0)
      )}

      {/* Combined Modal */}
      <Modal
        visible={modalContent !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {renderModalContent()}
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={openImageSelectorModal}
      >
        <Text style={styles.addButtonText}>+ Add Network</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  childItemContainer: {
    flexDirection: 'column',
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  personContainer: {

  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent:'center',
    borderColor:'black',
    borderWidth:1,
    borderRadius:3,
    padding:5
  },
  childContainer: {
    marginLeft: 20,
  },
  connector: {
    position: "absolute",
    top: 25,
    left: 25,
    width: 2,
    height: 20,
    backgroundColor: "#aaa",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  relationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  popupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  imageSelectorContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  imageSelectorContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  imageSelectorItem: {
    alignItems: "center",
    margin: 10,
  },
  imageSelectorImage: {
    width: 75,
    height: 90,
  },
  imageSelectorText: {
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "rgba(69, 145, 247, 1)",
    borderRadius: 5,
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FamilyTree;

