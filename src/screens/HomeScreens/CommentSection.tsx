import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Awesome post!",
      userId: 1,
      likes: 5,
      userName: "Saumya",
      likedByUser: false,
      replies: [],
      image:
        "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.webp?b=1&s=170667a&w=0&k=20&c=3F13TK1sFr-mxCGZtQU_JhmvqrBHetLJo3rHx6QFTiw=",
    },
    {
      id: 2,
      text: "Great picture!",
      userId: 2,
      likes: 10,
      userName: "Saumya",
      likedByUser: false,
      replies: [],
      image:
        "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.webp?b=1&s=170667a&w=0&k=20&c=3F13TK1sFr-mxCGZtQU_JhmvqrBHetLJo3rHx6QFTiw=",
    },
    // Add more sample comments as needed
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [showGlobalReplyInput, setShowGlobalReplyInput] = useState(false);

  const suggestedComments = ["Nice Pic", "Great Looking", "😎", "🔥", "❤️❤️"];

  const handleLikeComment = (commentId:any) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId && !comment.likedByUser
          ? { ...comment, likes: comment.likes + 1, likedByUser: true }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        userId: 3,
        likes: 0,
        likedByUser: false,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleSuggestedComment = () => {

    if (newComment?.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        userId: 3,
        likes: 0,
        likedByUser: false,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleReplyToComment = (commentId:any) => {
    setReplyToCommentId((prev) => (prev === commentId ? null : commentId));
    setShowGlobalReplyInput(false);
  };

  const handleReplyComment = ({ commentId, replyText }:any) => {
    if (replyText.length) {
      setComments((prevComments:any) =>
        prevComments.map((comment:any) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...comment.replies, { userId: 3, text: replyText }],
              }
            : comment
        )
      );
      setReplyToCommentId(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView >
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>Comments:</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "column" }}>
              <View style={styles.commentContainer}>
                <Image
                  source={{ uri: item.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png' }}
                  style={styles.profileImage}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>{item.userName || 'Sumit'}</Text>
                  <Text style={styles.commentText1}>{item.text}</Text>
                  <View style={styles.likeReplyContainer}>
                    <TouchableOpacity
                      style={styles.likeButton}
                      onPress={() => handleLikeComment(item.id)}
                    >
                      <Image
                        source={require("../../assets/icons/like.png")}
                        style={{ height: 15, width: 15 }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.likeText}>{`${item.likes}`}</Text>
                    <TouchableOpacity
                      style={styles.replyButton}
                      onPress={() => handleReplyToComment(item.id)}
                    >
                      <Image
                        source={require("../../assets/icons/comment.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FlatList
                data={item.replies as Array<{ userId: number; text: string }>}
                keyExtractor={(reply) => reply.userId.toString()}
                renderItem={({ item: reply }) => (
                  <View style={styles.replyContainer}>
                    <Image
                      source={{
                        uri: `https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.webp?b=1&s=170667a&w=0&k=20&c=YFwXXbAFfDtX7-2iNcbH6N-ttS3CcnMt7rlUlwIXZ2g=`,
                      }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.replyText}>{reply.text}</Text>
                  </View>
                )}
              />
              {replyToCommentId === item.id && (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40 }}></View>
                  <View style={styles.replyInputContainer}>
                    <TextInput
                      style={styles.replyInput}
                      placeholder="Reply to this comment..."
                      onChangeText={(text) => setNewComment(text)}
                      underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        handleReplyComment({
                          commentId: item.id,
                          replyText: newComment,
                        })
                      }
                    >
                      <Image
                        style={styles.searchIcon}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/6532/6532019.png",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        />

        {showGlobalReplyInput && (
          <View style={styles.globalReplyInputContainer}>
            <TextInput
              placeholder="Reply to any comment..."
              onChangeText={(text) => setNewComment(text)}
              style={styles.replyInput}
            />
            <TouchableOpacity
              style={styles.postReplyButton}
              onPress={() => {
                handleAddComment();
                setShowGlobalReplyInput(false);
              }}
            >
              <Text style={styles.postReplyButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.suggestedCommentsContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
        {suggestedComments.map((comment, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestedCommentButton}
            onPress={() =>{setNewComment(comment);handleSuggestedComment()}}
          >
            <Text style={styles.suggestedCommentText}>{"``"+comment+"``"}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
      
      <View style={styles.replyInputContainer1}>
        <TextInput
          style={styles.replyInput}
          placeholder="Type a comment....."
          onChangeText={(text) => setNewComment(text)}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => handleAddComment()}>
          <Image
            style={styles.searchIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6532/6532019.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    width: 300,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    // Set background color to white
  },
  suggestedCommentsContainer: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    marginBottom: 38,
  },
  suggestedCommentButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    height:40,
    borderColor:'black',
    color:'black',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  suggestedCommentText: {
    color: "black",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    borderBottomWidth: 0,
    // borderBottomColor: "#ddd", // Add a subtle border between comments
    paddingBottom: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  globalReplyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between", // Adjusted to create space between input and post button
  },
  commentText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
    fontWeight: "bold", // Set comment text color to black
  },
  commentText1: {
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
    // Set comment text color to black
  },
  likeReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    marginRight: 8,
  },
  likeText: {
    fontSize: 12,
    color: "#555", // Set like text color to a darker shade
  },
  replyButton: {
    marginLeft: 16,
  },
  replyText: {
    fontSize: 12,
    color: "#555",
  },
  replyInputContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    bottom:30,
    height:45,
    borderRadius:20
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  replyInput: {
    borderBottomWidth: 0,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    width: '80%',
  },
  postReplyButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  postReplyButtonText: {
    color: "#fff",
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderTopWidth: 1,
    // borderTopColor: "#ddd", // Add a subtle border at the top of the input container
    paddingTop: 12,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  postButton: {
    backgroundColor: "#3498db", // Use a blue color for the Post button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  postButtonText: {
    color: "#fff", // Set text color to white for better contrast
  },
});

export default CommentSection;
