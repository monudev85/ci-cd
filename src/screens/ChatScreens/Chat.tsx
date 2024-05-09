import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Modal,
  PanResponder,
  Animated,
  PanResponderGestureState
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface IMessage {
  id: number;
  text: string;
  sender: string;
  status: string; // Status of the message (e.g., sent, delivered, read)
  timestamp: Date; // Timestamp of when the message was sent
  forwarded?: boolean; // Indicates if the message was forwarded
  repliedTo?: IMessage; // Reference to the replied message
}

const ChatScreen = ({ route, navigation }: any) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [editMessageText, setEditMessageText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [attachMessage, setAttachMessage] = useState(false);
  const [replyMessage,setReplyMessage]= useState('')

  const panPositions: { [key: number]: Animated.ValueXY } = {}; // Dictionary to store pan positions for each message

  const handlePanResponderMove = (id: number, pan: Animated.ValueXY,sender:string) =>
    Animated.event([null, { dx: pan.x }], { useNativeDriver: false });

  const handlePanResponderRelease = (id: number, pan: Animated.ValueXY, messageText: string, sender: string) => (_:any, gestureState: PanResponderGestureState) => {
    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    setAttachMessage(true);
    if ( gestureState.dx < -100) {
      setReplyMessage(messageText);
    }
    // Reset position
    
  };

  const RepliedMessage = () => {
    return (
      <View style={styles.repliedMessageContainer}>
        <Text style={styles.repliedMessageText}>{replyMessage}</Text>
      </View>
    );
  };


  const handleSend = () => {
    if (inputText.trim() === "") return;

   if(!replyMessage) { const newMessage: IMessage = {
      id: messages.length,
      text: inputText,
      sender: "user",
      status: "sent",
      timestamp: new Date(),
      
    };
    setMessages([...messages, newMessage]);
  }
    if(replyMessage){
      const newMessage: IMessage = {
        id: messages.length,
        text: inputText,
        sender: "user",
        status: "sent",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
    }

    setInputText("");
    // Here, you can implement logic to send the message to the server or recipient
  };
  

  const handleEdit = () => {
    setIsEditing(true);
    setEditMessageText(selectedMessage?.text || "");
    bottomSheetRef.current?.close();
  };

  const handleEditSubmit = () => {
    const updatedMessages = messages.map((message) =>
      message.id === selectedMessage?.id ? { ...message, text: editMessageText } : message
    );
    setMessages(updatedMessages);
    setIsEditing(false);
    setEditMessageText("");
  };

  const handleDelete = () => {
    const updatedMessages = messages.filter((message) => message.id !== selectedMessage?.id);
    setMessages(updatedMessages);
    bottomSheetRef.current?.close();
  };

  const handleLongPress = (message: IMessage) => {
    // Show context menu with options for reply, edit, delete
    bottomSheetRef.current?.open();
    setSelectedMessage(message);
  };

  useEffect(() => {
    // Dummy data for demonstration
    setMessages([
      { id: 1, text: "Hello!", sender: "user", status: "sent", timestamp: new Date() },
      { id: 2, text: "Hi there!", sender: "other", status: "delivered", timestamp: new Date() },
      { id: 3, text: "How are you?", sender: "user", status: "sent", timestamp: new Date() },
      { id: 4, text: "I'm good, thanks!", sender: "other", status: "read", timestamp: new Date() },
      { id: 5, text: "What about you?", sender: "other", status: "delivered", timestamp: new Date() },
      { id: 6, text: "I'm doing great!", sender: "user", status: "sent", timestamp: new Date() },
    ]);
    
  }, []);

  let bottomSheetRef = useRef<RBSheet>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginRight: 15 }}
            source={require("../../assets/images/ep_back.png")}
          ></Image>
          <Image
            source={{ uri: route?.params?.avatar }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{route?.params?.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{ height: 30, width: 30, marginRight: 10 }}
              source={{
                uri: "https://cdn-icons-png.freepik.com/512/5648/5648842.png",
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item: IMessage) => item.id.toString()}
        renderItem={({ item }: { item: IMessage }) => {
          const pan = new Animated.ValueXY();
          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: handlePanResponderMove(item.id, pan, item.sender),
            onPanResponderRelease: handlePanResponderRelease(item.id, pan, item.text,item.sender),
          });
          return (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              key={item.id}
            >
              <View style={{ alignItems: item.sender === "user" ? "flex-end" : "flex-start" }}>
                <Animated.View
                  style={[
                    styles.messageContainer,
                    { alignSelf: item.sender === "user" ? "flex-end" : "flex-start" },
                    {
                      transform: [{ translateX: pan.x }]
                    }
                  ]}
                  {...panResponder.panHandlers}
                >
                  <View
                    style={[
                      styles.bubble,
                      {
                        backgroundColor: item.sender === "user" ? "#5f8ff5" : "#E5E5EA",
                        borderBottomRightRadius: item.sender === "user" ? 0 : 15,
                        borderBottomLeftRadius: item.sender === "user" ? 15 : 0,
                      },
                    ]}
                  > 
                    <Text style={styles.messageText}>{item.text}</Text>
                  </View>
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {attachMessage &&
      <View style={{backgroundColor:'#5f8ff5',height:80,borderTopLeftRadius:20,borderTopRightRadius:20,padding:10}}>
        <View style={{justifyContent:'center',backgroundColor:'white',height:60,padding:20,borderTopRightRadius:20,borderTopLeftRadius:20,}}>
        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
        <Text style={styles.messageText}>{replyMessage}</Text>
        <TouchableOpacity onPress={()=>{setReplyMessage('');setAttachMessage(false)}}>
        <Image style={{height:20,width:20}} source={{uri:'https://static-00.iconduck.com/assets.00/circle-cross-icon-512x512-xqrzmbe1.png'}}></Image>
        </TouchableOpacity>
        </View>
        </View>
      </View>}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.open()}>
          <Image
            style={{ height: 30, width: 30, marginRight: 10 }}
            source={{ uri: "https://www.shareicon.net/data/512x512/2017/05/24/886398_add_512x512.png" }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "50%",
          },
        }}
      >
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.bottomSheetOption}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.bottomSheetOption}>Delete</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  repliedMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  repliedMessageText: {
    flex: 1,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#5f8ff5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    maxWidth: "70%",
  },
  bubble: {
    borderRadius: 15,
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight:"600"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingEnd: 5,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  replyModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  replyModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    color: "blue",
    marginTop: 10,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetOption: {
    fontSize: 18,
    paddingVertical: 15,
  },
  bottomSheetContent: {
    width: "100%",
    alignItems: "center",
    justifyContent:'center'
  },
  bottomSheetDraggableIcon: {
 
  },
});

export default ChatScreen;
