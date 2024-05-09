import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import TabHeader from '../../components/TabHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultComponent from './CommentSection';
import CommentSection from './CommentSection';

export default function FullScreenImage({ route, navigation }: any) {
  const { post } = route.params;
  const [newReply, setNewReply] = useState<string>('');
  const [parentCommentId, setParentCommentId] = useState<number>(0);
  const [showTextInput, setShowTextInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [showGlobalReplyInput, setShowGlobalReplyInput] = useState(false);
  const [localComments, setLocalComments] = useState<any[]>([
    { 
      id: 1, 
      profilePic: 'https://media.istockphoto.com/id/1460124878/photo/social-media-connection-and-woman-typing-on-a-phone-for-communication-app-and-chat-web-search.webp?b=1&s=170667a&w=0&k=20&c=2jxUr_WTdJyMUD0OcnXD1Fdbb63f8TDkTvpcPsA7aHI=', 
      name: 'John Doe', 
      comment: 'This is a local comment.',
      replies: []
    },
    { 
      id: 2, 
      profilePic: 'https://media.istockphoto.com/id/1460124878/photo/social-media-connection-and-woman-typing-on-a-phone-for-communication-app-and-chat-web-search.webp?b=1&s=170667a&w=0&k=20&c=2jxUr_WTdJyMUD0OcnXD1Fdbb63f8TDkTvpcPsA7aHI=', 
      name: 'Jane Doe', 
      comment: 'Another local comment.',
      replies: []
    },
  ]);


  return (
    <SafeAreaView>
    <ScrollView >
      <TabHeader />
      <View style={styles.postDetailsContainer}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text>{post.name} </Text>
              <Image height={20} width={20} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/01_Icon-Community%402x.png' }} />
            </View>
            <Text>{post.time}</Text>
          </View>
        </View>
        <Text style={styles.postDescription}>{post.postDescription}</Text>
      </View>
      <Image source={{ uri: post.postPic }} style={styles.fullImage} />
      <View style={styles.commentSection}>
        <View style={styles.commentList}>
          <Text style={{ fontWeight: 'bold' }}>Comments:</Text>
          {/* Render local comments */}
         
        </View>

        
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          style={styles.commentInput}
        />
        <TouchableOpacity
          onPress={() => {
            setShowGlobalReplyInput(true); // Show the global reply input when clicking on the main input
            setReplyToCommentId(null); // Reset replyToCommentId when clicking on the main input
          }}
          style={styles.postButton}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderTopWidth: 1,
    // borderTopColor: "#ddd", // Add a subtle border at the top of the input container
    paddingTop: 12,
    bottom:40,
    paddingHorizontal:20
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
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
  container: {
    flex: 1,
  },
  fullImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postDetailsContainer: {
    paddingHorizontal: 10,
  },
  smileyIcon: {
    width: 20,
    height: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  postDescription: {
    marginVertical: 10,
  },
  commentSection: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 100, // Leave enough room for the sticky footer
  },
  commentList: {
    marginTop: 10,
  },
  commentItem: {
    marginVertical: 8,
    paddingHorizontal:20,
  },
  commentProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentorName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
   commentOptions:{
     flexDirection:'row',
     marginTop :4
   },
   replyContainer:{
     flexDirection:'row',
     alignItems:'center',
     backgroundColor:'white',
     marginTop :4,
     marginLeft :50,
     padding :10,
     borderRadius :21,
     borderWidth :0.5,
     borderColor :'#ccc'
   },
   replyInput:{
     flex :1 ,
     height :42 ,
     borderRadius :21 ,
     borderWidth :0.5 ,
     borderColor :'#ccc' ,
     marginRight :10 ,
     padding :5
   },
   commentsContainer:{
     maxHeight :'50%',
     padding :10,
     flexDirection: 'row',
     alignItems: 'flex-start',
     marginVertical: 8,
     paddingHorizontal:20,
   },
   commentText:{
     marginBottom :5
   },
   fixedTextInputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   fixedTextInput:{
    width: 380, // Set the width to 380px
    height: 42, // Set the height to 42px
    borderRadius: 21, // Set the border radius to 21px
    borderWidth: 0.5, // Set the border width to 0.5px
    borderColor: 'black', // Set the border color
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
   }
});

