import React, { useState, useRef, useEffect, FC } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  ViewStyle,
  SafeAreaView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import ImagePicker, {
  Image as ImageOrVideo,
} from "react-native-image-crop-picker";
import Video from "react-native-video";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import CreatePostHeader from "../../components/CreatePostHeader";
import TagPeopleHeader from "../../components/TagPeopleHeader";
import YouTube from "react-native-youtube";
import MyPopup from "./SettingsPopup";
import TagFilter from "./TagFilter";

import {
  MentionInput,
  MentionSuggestionsProps,
  Suggestion,
} from "react-native-controlled-mentions";
import _ from "lodash";
import ShareMoment from "../../assets/icons/ShareMoment";


interface Tag {
  id: number;
  locationX: number;
  locationY: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

// Simple URL validation function
const isValidURL = (url: any) => {
  const pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/, "g");
  return pattern.test(url);
};

const ShareMoments = () => {
  const [caption, setCaption] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(20); // Initial font size
  const [media, setMedia] = useState<ImageOrVideo[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [youtubeVideoReady, setYoutubeVideoReady] = useState(false);
  const carouselRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [taggingImage, setTaggingImage] = useState<ImageOrVideo | null>(null);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);
  const [isSearchText, setIsSearchText] = useState(false);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const suggestions = [
    { id: "1", name: "David Tabaka" },
    { id: "2", name: "Mary" },
    { id: "3", name: "Tony" },
    { id: "4", name: "Mike" },
    { id: "5", name: "Grey" },
  ];

  const hashtags = [
    { id: "todo", name: "todo" },
    { id: "help", name: "help" },
    { id: "loveyou", name: "loveyou" },
  ];

  useEffect(() => {
    setUserList([
      { id: 1, name: "Mariko Timothy" },
      { id: 2, name: "Eldora Seaton" },
      // ... (add the rest of the user list)
    ]);
  }, []);

  const renderSuggestions: (
    suggestions: Suggestion[]
  ) => FC<MentionSuggestionsProps> =
    (suggestions) =>
    ({ keyword, onSuggestionPress }) => {
      if (keyword == null) {
        return null;
      }

      return (
        <View>
          {suggestions
            .filter((one) =>
              one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
            )
            .map((one) => (
              <Pressable
                key={one.id}
                onPress={() => onSuggestionPress(one)}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              >
                <Text>{one.name}</Text>
              </Pressable>
            ))}
        </View>
      );
    };
  const renderHashtagSuggestions = renderSuggestions(hashtags);
  const renderMentionSuggestions = renderSuggestions(suggestions);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleCaptionChange = (text: any) => {
    setCaption(text);

    // Update font size based on text length or any other criteria
    const newFontSize = text.length ? 16 : 20;
    setFontSize(newFontSize);

    // Check if the entered text is a YouTube link and add it to media
    if (text.includes("youtube.com")) {
      const youtubeLink = text.split(" ")[0]; // Extract the YouTube link
      addYouTubeLink(youtubeLink);
    } else {
      // If the text doesn't contain a YouTube link, remove the YouTube video from the media
      const updatedMedia = media.filter(
        (item) => item.type !== "video" || !item.path.includes("youtube.com")
      );
      setMedia(updatedMedia);
    }
  };

  const addYouTubeLink = (link: any) => {
    if (isValidURL(link)) {
      setMedia([...media, { path: link, type: "video" }]);
      // You may want to handle YouTube link validation more thoroughly
      // and display an error message if the link is not valid
    }
  };
  const openImagePicker = () => {
    setImageModalVisible(true);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setMedia([...media, { ...image, type: "image" }]);
      setImageModalVisible(false);
    });
  };

  const chooseMediaFromLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "any",
    })
      .then((selectedMedia) => {
        setMedia([
          ...media,
          ...selectedMedia.map((item) => ({
            ...item,
            type: item.mime.startsWith("video") ? "video" : "image",
          })),
        ]);
        setImageModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePress = (evt: any) => {
    setTop((evt.nativeEvent.locationY * 100) / screenHeight);
    setLeft((evt.nativeEvent.locationX * 100) / screenWidth);

    setTimeout(() => {
      setIsSearchText(true);
    }, 100);
  };

  const handleSearch = (keyword: any) => {
    const filteredList = userList.filter((user) =>
      user.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setUserList(filteredList);
  };

  const tagUser = (user: User) => {
    const newView: Tag = {
      locationX: left,
      locationY: top,
      name: user.name,
      id: user.id,
    };

    setIsSearchText(false);
    setTagList([...tagList, newView]);
    console.log("===tagList==", tagList);
  };

  const removeUser = (user: Tag) => {
    const tempUser = tagList.slice();
    const index = _.findIndex(tempUser, (o: any) => o.id === user.id);
    tempUser.splice(index, 1);
    setTagList(tempUser);
  };

  const dynamicStyle = (data: Tag) => {
    const dynamicLeft = (screenWidth * data.locationX) / 100;
    const dynamicTop = (screenHeight * data.locationY) / 100;

    return {
      position: "absolute",
      top: dynamicTop,
      left: dynamicLeft - 22,
      justifyContent: "center", // Adjust this value as needed
    } as ViewStyle; // Explicitly specify the type as ViewStyle
  };

  const renderFullScreenImage = () => {
    const selectedImage = media[fullScreenImageIndex];
    if (!selectedImage || selectedImage.type !== "image") {
      return null;
    }

    return (

      <Modal isVisible={fullScreenModalVisible}>

        {isSearchText && (
          <View style={styles.userSearch}>
            <TagPeopleHeader/>


            <View style={styles.container}>
            {isPopupVisible == false && (
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                  }}
                  style={styles.profileImage}
                />
                <View
                  style={{
                    flexDirection: "column",
                    padding: 10,
                    gap: 3,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.username}>Saumya Mishra</Text>
                  <Text style={styles.handle}>@iamsaumya</Text>
                </View>
              </View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >



              <TouchableOpacity
                onPress={handleOpenPopup}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/Filter.png")}
                  style={{height:25,
                  width:25}}
                ></Image>
                {isPopupVisible == true && <Text style={{marginLeft:5}}>Filter</Text>}
              </TouchableOpacity>


             
              <TagFilter visible={isPopupVisible} onClose={handleClosePopup} />

            </View>
          </View>

            
          
            <View style={styles.searchContainer}>

              

              <TextInput
                style={styles.textInputStyle}
                placeholder="Search for a User"
                onChangeText={(keyword) => handleSearch(keyword)}
                onBlur={(keyword) => handleSearch(keyword)}
              />

           


            </View>


            
            <ScrollView>
              {userList.map((user) => (
                <TouchableOpacity key={user.id} onPress={() => tagUser(user)}>
                  <View style={styles.userList}>
                    <Text style={styles.userListText}>{user.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>


          </View>
        )}

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={(evt) => handlePress(evt)}
            disabled={isSearchText}
          >
            <Image
              source={{ uri: selectedImage.path }}
              style={{
                flex: 1,
                width: 500,
                height: 300,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFullScreenModalVisible(false)}>
            {/* Add a close button or any other UI element to close the modal */}
            <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
        {tagList.map((list) => (
          <View key={list.id} style={dynamicStyle(list)}>
            <View style={styles.tagTriangle}></View>
            <View style={styles.tagUserView}>
              <Text style={styles.tagListText}>{list.name}</Text>
              <TouchableOpacity
                key={list.id}
                style={styles.removeTagUser}
                onPress={() => removeUser(list)}
              >
                <Image
                  style={styles.removeIcon}
                  source={{
                    uri: "data:image/jpeg;base64,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",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Modal>
    );
  };

  const renderMediaItem = ({ item, index }: any) => {
    const totalMediaCount = media.length;
    if (item.type === "image") {
      return (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.carouselItemContainer}>
            <Image source={{ uri: item.path }} style={styles.selectedImage} />
            <Text style={styles.carouselIndex}>
              {index + 1}/{totalMediaCount}{" "}
              {selectedUser ? ` @${selectedUser.name} ` : ""}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (item.type === "video") {
      if (item.path.includes("youtube.com")) {
        const videoId = item.path.split("v=")[1];
        return (
          <YouTube
            videoId={videoId}
            play={index === currentMediaIndex}
            style={styles.video}
            apiKey="YOUR_YOUTUBE_API_KEY" // Replace with your YouTube API key
          />
        );
      } else {
        return (
          <Video
            source={{ uri: item.path }}
            style={styles.video}
            paused={index !== currentMediaIndex}
            repeat
            resizeMode="cover"
            onError={(error) => console.error("Video error:", error)}
          />
        );
      }
    }

    return null;
  };

  const renderSelectedMedia = () => {
    return (
      <Carousel
        ref={carouselRef}
        data={media}
        renderItem={renderMediaItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index: any) => setCurrentMediaIndex(index)}
        layout="stack"
      />
    );
  };

  const CreatePost = () => {
    const renderLoadingButton = () => {
      if (!youtubeVideoReady) {
        return <TouchableOpacity style={{}}></TouchableOpacity>;
      }
      return null;
    };
    const handleImagePress = () => {
      setFullScreenImageIndex(currentMediaIndex);
      setFullScreenModalVisible(true);
    };
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 20,
          
        }}
      >
        <ScrollView >
          {/* <View style={{backgroundColor:'yellow'}}> */}
          <View style={styles.container}>
            {isPopupVisible == false && (
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                  }}
                  style={styles.profileImage}
                />
                <View
                  style={{
                    flexDirection: "column",
                    padding: 10,
                    gap: 3,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.username}>Saumya Mishra</Text>
                  <Text style={styles.handle}>@iamsaumya</Text>
                </View>
              </View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleOpenPopup}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/settings.png")}
                ></Image>
                {isPopupVisible == true && <Text> Settings</Text>}
              </TouchableOpacity>
              <MyPopup visible={isPopupVisible} onClose={handleClosePopup} />
            </View>
          </View>

          {isPopupVisible == false && (
            // <View style={styles.postContent}>
            <MentionInput
              value={caption}
              onChange={handleCaptionChange}
              onBlur={() => handleCaptionChange(caption)}
              style={[styles.captionInput, { fontSize: fontSize, }]}
              placeholder="Write a caption..."
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              multiline={true}
              numberOfLines={500}
              partTypes={[
                {
                  trigger: "@", // Should be a single character like '@' or '#'
                  renderSuggestions: renderMentionSuggestions,
                  textStyle: { fontWeight: "bold", color: "blue" },
                  isBottomMentionSuggestionsRender: true, // The mention style in the input
                },
                {
                  trigger: "#",
                  renderSuggestions: renderHashtagSuggestions,
                  textStyle: { fontWeight: "bold", color: "grey" },
                  isBottomMentionSuggestionsRender: true,
                },
              ]}
            />
            // </View>
          )}
          {media.length > 0 && isPopupVisible == false && (
            <View style={styles.selectedMediaContainer}>
              {renderLoadingButton()}
              {renderSelectedMedia()}
            </View>
          )}
          {media.length == 0 && isPopupVisible == false && (
            <View style={{ height: 200 }}></View>
          )}
          {isPopupVisible == false && (
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.postButton}
                onPress={openImagePicker}
              >
                <Image
                  source={require("../../assets/icons/openGallery.png")}
                ></Image>
                <Text style={styles.postButtonText}>Add photo/video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginBottom: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: 200,
                  height: 40,
                  paddingHorizontal: 10,
                  gap: 15,
                }}
                onPress={() => handleImagePress()}
              >
                <Image
                  source={require("../../assets/icons/tagUser.png")}
                ></Image>
                <Text style={styles.postButtonText}>Tag people</Text>
              </TouchableOpacity>
            </View>
          )}
          {isPopupVisible == false && (
            <View
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  marginBottom: 30,
                  backgroundColor: "rgba(69, 145, 247, 1)",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 40,
                  paddingHorizontal: 10,
                }}
                onPress={openImagePicker}
              >
                <Text style={{ color: "white" }}>Post</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* </View> */}

          {/* Suggestions Modal */}
          <Modal isVisible={suggestionsVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  {suggestions.map((user) => (
                    <Pressable
                      key={user.id}
                      onPress={() => {
                        setSelectedUser(user);
                        setSuggestionsVisible(false);
                      }}
                      style={{
                        padding: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ddd",
                      }}
                    >
                      <Text>{user.name}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    setSuggestionsVisible(false);
                    setTaggingImage(null);
                  }}
                  style={{
                    paddingVertical: 15,
                  }}
                >
                  <Text style={styles.modalOptionTextCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* Modal for Image Picker Options */}
          <Modal isVisible={imageModalVisible}>
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
                  onPress={chooseMediaFromLibrary}
                >
                  <Text style={styles.modalOptionText}>
                    Choose from Library
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOptionCancel}
                  onPress={() => setImageModalVisible(false)}
                >
                  <Text style={styles.modalOptionTextCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
        {renderFullScreenImage()}
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.touchableBox}
        onPress={() => setModalVisible(true)}
      >
        <ShareMoment style={{marginRight:10}}></ShareMoment>
        <Text style={styles.shareText}>Share your moments with us</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        // onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity
              style={{ justifyContent: "flex-start" }}
              onPress={() => setModalVisible(false)}
            >
              <Image
                style={styles.arrowIcon}
                source={require("../../assets/images/ep_back.png")}
              ></Image>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>Create Post</Text>
            </View>
            <View>
              <Text style={{ color: "white" }}>Black</Text>
            </View>
          </View>
          <View style={styles.shadow} />
        </SafeAreaView>
        {CreatePost()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 100 / 2,
    position: "absolute",
  },
  arrowIcon: {
    width: 25,
    height: 25,
  },
  imageStyle: {
    width: 100,
    height: 100 / 2,
  },
  shadow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tagTriangle: {
    height: 0,
    width: 0,
    left: 15,
    borderLeftColor: "transparent",
    borderLeftWidth: 7,
    borderRightColor: "transparent",
    borderRightWidth: 7,
    borderBottomColor: "rgba(0,0,0,.30)",
    borderBottomWidth: 7,
  },
  tagUserView: {
    backgroundColor: "rgba(0,0,0,.30)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.30)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: "row",
  },
  tagListText: {
    color: "white",
    fontWeight: "800",
  },
  removeTagUser: {
    backgroundColor: "white",
    height: 15,
    width: 15,
    marginLeft: 5,
    borderRadius: 15,
  },
  removeIcon: {
    height: 8,
    width: 8,
    marginTop: 3,
    marginLeft: 3.5,
  },
  userSearch: {
    zIndex: 99,
    height:'100%',
    backgroundColor:'white'
  },
  userList: {
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  userListText: {
    fontWeight: "600",
  },



  searchContainer: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius:50,
    marginHorizontal:10,
    marginVertical:10
  },
  searchIconStyle: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  closeIconStyle: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginRight: 10,
  },
  textInputStyle: {
    height: 40,
    marginLeft: 10,
    alignItems: "flex-start",
    width: 250,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  video: {
    flex: 1,
    width: "90%",
    borderRadius: 10,
  },
  selectedMediaContainer: {
    marginTop: 10,
    height: 400,
  },
  carouselItemContainer: {
    overflow: "hidden",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  carouselIndex: {
    position: "absolute",
    top: 5,
    left: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  selectedImage: {
    width: "90%",
    height: "100%",
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
    paddingHorizontal: 0,
    width: "100%",
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
  modal: {
    backgroundColor: "white",
    margin: 0,
    paddingHorizontal: 0,
    justifyContent: "flex-start",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical:5,
    paddingHorizontal:5
  },
  createPostContainer: {},
  postHeader: {
    // Add your styles for the post header
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    // Add your styles for the profile image
  },
  username: {
    justifyContent: "flex-start",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    // Add your styles for the username
  },
  handle: {
    color: "gray",
    // Add your styles for the handle
  },
  postContent: {
    paddingTop: 30,
    // height: "auto",
    backgroundColor: "green",
    height: "15%",
    // Add your styles for the post content
  },
  captionInput: {
    marginTop: 20,
    color: "black",
    fontWeight: "400",
    height: 150, // Adjust the height as needed
    textAlignVertical: "top", // Align text to the top of the input
    padding: 10, // Add padding for better readability
    backgroundColor: "white", // Set the background color to white
  },

  postActions: {
    marginTop: 20,
    // Add your styles for the post actions
  },
  postButton: {
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "black",
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    // Add your styles for the post button
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "400",
    // Add your styles for the post button text
  },
  touchableBox: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  instagramIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  shareText: {
    fontSize: 16,
    color: "#000",
    fontWeight:'400'
  },
});

export default ShareMoments;
