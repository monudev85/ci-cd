import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const StoryViewer = ({ route, navigation }) => {
  const { Stories, Name, ProfilePic } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(Array(Stories.length).fill(0));
  const [reactions, setReactions] = useState(Array(Stories.length).fill(""));
  const [progress, setProgress] = useState(100); // Progress in percentage
  const storyDuration = 5; // Duration of each story in seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, storyDuration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => Math.max(prevProgress - (100 / (storyDuration * 20)), 0)); // Update progress bar every 50 milliseconds
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, progress]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Stories.length - 1 ? 0 : prevIndex + 1));
    setProgress(100);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Stories.length - 1 : prevIndex - 1));
    setProgress(100);
  };

  const handleLike = () => {
    const updatedLikes = [...likes];
    updatedLikes[currentIndex] += 1;
    setLikes(updatedLikes);
  };

  const handleComment = () => {
    // Here you can send the comment to your backend or store it locally
    console.log("Comment:", comment);
    setComment("");
  };

  const handleReact = (reaction) => {
    const updatedReactions = [...reactions];
    updatedReactions[currentIndex] = reaction;
    setReactions(updatedReactions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: ProfilePic }} style={styles.profilePic} />
        <Text style={styles.username}>{Name}</Text>
      </View>
      <View style={styles.storyContainer}>
        <Image source={{ uri: Stories[currentIndex] }} style={styles.storyImage} />
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.actionButton} onPress={handlePrev}>
              <Text style={styles.actionButtonText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
              <Text style={styles.actionButtonText}>›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.interactionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Text style={styles.actionButtonText}>❤️ {likes[currentIndex]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleReact("❤️")}>
              <Text style={styles.actionButtonText}>React</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
              <Text style={styles.actionButtonText}>Comment</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={handleComment}
          />
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  storyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "white",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  interactionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontSize: 16,
    color: "white",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    color: "white",
    width: "90%",
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    height: 10,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});

export default StoryViewer;