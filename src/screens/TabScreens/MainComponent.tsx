import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  Switch,
} from "react-native";
import TabHeader from "../../components/TabHeader";
import ActiveUser from "../HomeScreens/ActiveUsers";
import ShareMoments from "../HomeScreens/ShareMoments";

import RBSheet from "react-native-raw-bottom-sheet";
import CommentSection from "../HomeScreens/CommentSection";
import Share from "react-native-share";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Comment from "../../assets/icons/Comment";
import SharePost from "../../assets/icons/Share";
import Bookmark from "../../assets/icons/Bookmark";
import ThreeDot from "../../assets/icons/ThreeDots";

const windowHeight = Dimensions.get("window").height;

export default function MainComponent({ navigation }: any) {
  const feedData = [
    // Add your feed items here
    {
      id: 1,
      profilePic:
        "https://media.istockphoto.com/id/1420486889/photo/candid-portrait-of-young-middle-eastern-digital-native.webp?b=1&s=170667a&w=0&k=20&c=XZ57XDmNuS_eOtXdKpEFeMmen4hIKoHGeZ89B4HHOYY=",
      name: "John Doe",
      time: "2 hours ago",
      isActiveUser: true,
      postDescription:
        "Through thought-provoking discussions and practical tips, we offer insights into managing and harnessing the power of emotions to lead more fulfilling and authentic lives. Whether you're seeking guidance on navigating the complexities of interpersonal relationships or simply yearning for a deeper understanding of your own emotional landscape, this post serves as a beacon of insight and inspiration.",
      postPic: [
        "https://media.istockphoto.com/id/1420486889/photo/candid-portrait-of-young-middle-eastern-digital-native.webp?b=1&s=170667a&w=0&k=20&c=XZ57XDmNuS_eOtXdKpEFeMmen4hIKoHGeZ89B4HHOYY=",
        "https://media.istockphoto.com/id/1420486889/photo/candid-portrait-of-young-middle-eastern-digital-native.webp?b=1&s=170667a&w=0&k=20&c=XZ57XDmNuS_eOtXdKpEFeMmen4hIKoHGeZ89B4HHOYY=",
      ],
      likes: 10,
      countComments: 10,
      shares: 2,
      type: "Hive",
    },
    {
      id: 2,
      profilePic:
        "https://media.istockphoto.com/id/1460124878/photo/social-media-connection-and-woman-typing-on-a-phone-for-communication-app-and-chat-web-search.webp?b=1&s=170667a&w=0&k=20&c=2jxUr_WTdJyMUD0OcnXD1Fdbb63f8TDkTvpcPsA7aHI=",
      name: "Smriti",
      time: "2 hours ago",
      isActiveUser: true,
      postDescription: "This is a sample post description.",
      postPic: [
        "https://media.istockphoto.com/id/1460124878/photo/social-media-connection-and-woman-typing-on-a-phone-for-communication-app-and-chat-web-search.webp?b=1&s=170667a&w=0&k=20&c=2jxUr_WTdJyMUD0OcnXD1Fdbb63f8TDkTvpcPsA7aHI=",
      ],
      likes: 10,
      countComments: 10,
      shares: 2,
      type: "Mate",
    },
    {
      id: 3,
      profilePic:
        "https://media.istockphoto.com/id/1472634441/photo/senior-woman-using-a-laptop-computer-at-home.webp?b=1&s=170667a&w=0&k=20&c=QxSWmTLaR7YQipZJrEzQ2qddWWkzDTItuM9qctIvGLQ=",
      name: "Tanu",
      time: "2 hours ago",
      isActiveUser: true,
      postDescription: "This is a sample post description.",
      postPic: [
        "https://media.istockphoto.com/id/1472634441/photo/senior-woman-using-a-laptop-computer-at-home.webp?b=1&s=170667a&w=0&k=20&c=QxSWmTLaR7YQipZJrEzQ2qddWWkzDTItuM9qctIvGLQ=",
      ],
      likes: 10,
      countComments: 10,
      shares: 2,
      type: "Community",
    },
    // Add more feed items as needed
  ];

  const bottomSheetRef = useRef<RBSheet>(null); // Use the ref from react-native-raw-bottom-sheet
  const bottomShareSheetRef = useRef<RBSheet>(null);
  const bottomSheetOptionsRef = useRef<RBSheet>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isShareBottomSheetVisible, setShareBottomSheetVisible] =
    useState(false);
  const [isShareOptionsBottomSheetVisible, setShareOptionsBottomSheetVisible] =
    useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const [width, setWidth] = useState(10);

  const handlePress = () => {
    setWidth(35); // Change width to 23 when TouchableOpacity is touched
    setTimeout(() => {
      setWidth(15); // Revert width back to 10 after 10 seconds
    }, 1000);
  };
  const handlePostPress = () => {
    // Navigate to the PostDetailScreen and pass the selected post as a parameter
  };

  const handleCommentPress = () => {
    setBottomSheetVisible(true);
    bottomSheetRef.current?.open(); // Open the bottom sheet
  };

  const handleThreeDotsPress = () => {
    setShareOptionsBottomSheetVisible(false);
    // Open the bottom sheet when three dots are clicked
    setShareBottomSheetVisible(true);
    bottomShareSheetRef.current?.open();
  };

  const openShareSheet = async () => {
    try {
      const shareOptions = {
        title: "Share via",
        message: "Check out this post!",
        url: "https://example.comjjjj", // Replace with your post URL
      };
      await Share.open(shareOptions);
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };
  const handleBottomSheetOption = (option: string) => {
    // Handle actions based on the selected option
    switch (option) {
      case "block":
        // Implement block logic
        console.log("User blocked");
        break;
      case "share":
        // Implement share logic
        setShareOptionsBottomSheetVisible(true);
        openShareSheet();
        console.log("Share post");
        break;
      case "hide":
        // Implement hide logic
        console.log("Hide post");
        break;
      case "report":
        // Implement report logic
        console.log("Report user");
        break;
      default:
        break;
    }

    // Close the bottom sheet after handling the action
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const [feedStates, setFeedStates] = useState(
    feedData.map(() => ({ activeIndex: 0, count: 0 }))
  );

  const toggleAnimation = new Animated.Value(toggleValue ? 1 : 0);

  const toggleSwitch = () => {
    setToggleValue((previousState) => !previousState);
  };

  const handleSnapToItem = (index: any, feedIndex: any) => {
    setFeedStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[feedIndex] = {
        ...updatedStates[feedIndex],
        activeIndex: index,
        count: feedData[feedIndex].postPic.length,
      };
      return updatedStates;
    });
  };

  const renderItem = ({ item, index: itemIndex, feed }: any) => {
    const feedIndex = feedData.findIndex((feed) => feed.postPic.includes(item));
    const feedState = feedStates[feedIndex];

    if (!feedState) {
      return null; // Return null if feedState is undefined
    }

    return (
      <TouchableOpacity onPress={handlePostPress}>
        <Image source={{ uri: item }} style={styles.postImage} />
        {feed > 1 && (
          <Text style={styles.carouselIndex}>
            {feedState.activeIndex + 1}/{feed}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const transformStyle = {
    transform: [
      {
        translateX: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 18],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TabHeader navigation={navigation} />
      <ScrollView>
       
        {/* <ActiveUser navigation={navigation}  /> */}

        <View
          style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 20 }}
        >
          <ShareMoments />
        </View>

        {feedData.map((feedItem, feedIndex) => (
          <View
            style={styles.feedItem}
            onAccessibilityTap={() => setCount(feedItem.postPic.length)}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <View style={styles.userInfo}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: feedItem.profilePic }}
                      style={styles.profilePic}
                    />


                    


                  </View>

                  {/* cutout */}
                  
                  {(feedItem.type === "Hive" || feedItem.type === "Mate") && (
                      <TouchableOpacity
                        style={[styles.cutout,]}
                        onPress={handlePress}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            backgroundColor: "transparent",
                            fontSize: 12,
                            paddingLeft:3.5,
                            alignSelf:"center",
                            justifyContent:"center",
                          }}
                        >
                          {feedItem.type}
                        </Text>
                      </TouchableOpacity>
                    )}

                  {/* cutout */}

                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      {feedItem.name}{" "}
                    </Text>
                    <Text style={{ fontWeight: "400", fontSize: 12 }}>
                      {feedItem.time}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleThreeDotsPress()}>
                  <ThreeDot></ThreeDot>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={toggleDescription}>
                {feedItem.postDescription.length > 200 ? (
                  <Text style={styles.postDescription}>
                    {showFullDescription
                      ? feedItem.postDescription
                      : `${feedItem.postDescription.substring(0, 200)}... `}
                    {!showFullDescription && (
                      <Text style={{ color: "#595856" }}>View more</Text>
                    )}
                  </Text>
                ) : (
                  <Text style={styles.postDescription}>
                    {feedItem.postDescription}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handlePostPress}>
              <Carousel
                data={feedItem.postPic} // Use postPic array for carousel data
                renderItem={({ item, index }) =>
                  renderItem({
                    item,
                    index,
                    feedIndex,
                    feed: feedItem.postPic.length,
                  })
                } // Pass feedIndex to renderItem
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
                onSnapToItem={(index) => handleSnapToItem(index, feedIndex)} // Pass feedIndex
              />
            </TouchableOpacity>
            <View style={styles.interactions}>
              <View style={styles.icons}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => console.log("Like pressed")}
                >
                  <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                    <View
                      style={[
                        styles.toggleContainer,
                        toggleValue && styles.activeToggle,
                      ]}
                    >
                      <Animated.View
                        style={[
                          styles.toggleButton,
                          transformStyle,
                          toggleValue && styles.activeButton,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.interactionText}>{feedItem.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={handleCommentPress}
                >
                  <Comment></Comment>
                  <Text style={styles.interactionText}>
                    {feedItem.countComments}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => console.log("Share pressed")}
                >
                  <SharePost></SharePost>
                  <Text style={styles.interactionText}>{feedItem.shares}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bookmarkContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => console.log("Bookmark pressed")}
                >
                  <Bookmark></Bookmark>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <RBSheet
        ref={bottomShareSheetRef}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "50%",
          },
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity onPress={() => handleBottomSheetOption("block")}>
            <Text>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBottomSheetOption("share")}>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBottomSheetOption("hide")}>
            <Text>Hide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBottomSheetOption("report")}>
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "90%",
          },
        }}
      >
        <CommentSection />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  cutout: {
    position: "absolute",
    bottom:-5,
    left:35,
    width:20,
    height: 20, // Adjust this to control the size of the cutout
    backgroundColor: "white",
    borderRadius:20/2
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  toggleContainer: {
    width: 38,
    height: 24,
    borderRadius: 15,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 2,
  },
  activeToggle: {
    backgroundColor: "#e07979",
  },
  toggleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#737270",
  },
  activeButton: {
    backgroundColor: "red",
    transform: [{ translateX: 14 }], // For animation effect
  },
  carouselIndex: {
    position: "absolute",
    top: 5,
    left: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    backgroundColor: "white", // Change color as desired
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  interactions: {
    flexDirection: "row", // Change to 'flex-start'

    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  icons: {
    justifyContent: "flex-start",
    flexDirection: "row", // Change to 'flex-start'
  },
  iconImage: {},
  interactionText: {
    marginLeft: 5,
  },
  feedItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  activeUserButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginLeft: "auto",
  },
  postDescription: {
    marginVertical: 10,
    color: "black",
    fontSize: 15,
    fontWeight: "400",
  },
  postImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginBottom: 10,
    flex: 1,
  },

  nteractions: {
    flexDirection: "row",
    justifyContent: "flex-start", // Change to 'flex-start'
    alignItems: "center",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "column",

    marginRight: 10,
    alignItems: "center", // Add margin to separate the icons
  },
  // New styles
  bookmarkContainer: {
    // Change to column
    alignItems: "flex-end", // Align to the right
  },
  bookmarkImage: {
    marginLeft: 10, // Reverse the margin direction
  },
  container: {
    paddingHorizontal: 0,
    paddingBottom: 30,
  },
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20, // Adjust the margin as needed
  },
});
