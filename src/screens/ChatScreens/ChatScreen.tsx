import React ,{useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import TabHeader from '../../components/AddChatHeader.tsx';
import SearchInput from './SearchInput';
import AddChatHeader from './../../components/AddChatHeader';

const AVATAR_SIZE = 45;

export default function ChatScreen({ navigation,route }: any) {
  const ConversationItem = ({ name, avatar, lastMessage, isSeen, lastTime }:any) => {
    return (
      <View style={styles.conversationItem}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode='tail'>
              {lastMessage}
            </Text>
            <Text style={styles.lastTime}>{lastTime}</Text>
          </View>
        </View>
        {isSeen ? (
          <Image style={styles.seenIcon} source={{ uri: avatar }} />
        ) : (
          <View style={styles.unseenIcon} />
        )}
      </View>
    );
  };
  
  const UserItem = ({ avatar, name, isOnline }:any) => {
    return (
      <View style={styles.userItem}>
        {isOnline && (
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineInnerCircle} />
          </View>
        )}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar}} style={styles.avatar} />
        </View>
        <Text style={styles.userName}>{name}</Text>
      </View>
    );
  };
  const [data, setData]=useState();
  const listConversations = [
    {
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png',
      name: 'Rahul Joshi',
      lastMessage: 'Hello!!',
      lastTime: '15:34',
      isSeen: true,
    },
    {
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45iw0JMN9RIPGIcusf6JCa5T5voIpoiNo3A&usqp=CAU',
      name: 'Prerna Mishra',
      lastMessage: 'Hii',
      lastTime: 'Thu 2',
    },
    {
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcOZgOfHGnDiurNMoT2PTS0ljvZ42JNcIGWw&usqp=CAU',
      name: 'Saumya Mishra',
      lastMessage: 'Hello',
      lastTime: 'Wed 3',
    },
  ];

  const users = [
    {
      name: 'Rahul',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png',
      isOnline: true,
    },
    {
      name: 'Prerna',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45iw0JMN9RIPGIcusf6JCa5T5voIpoiNo3A&usqp=CAU',
      isOnline: false,
    },
    {
      name: 'Saumya',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcOZgOfHGnDiurNMoT2PTS0ljvZ42JNcIGWw&usqp=CAU',
      isOnline: true,
    },
  ];

  const keyExtractor=(item:any) => item.id

  const renderItem = ({ item }:any) => {
    const { avatar, name, lastMessage, lastTime, isSeen } = item;
    return (
      <TouchableOpacity
      onPress={(item) => navigation.navigate('Chat', {avatar, name,lastMessage,lastTime,isSeen})} // Add this line for navigation
      key={item.index}
    >
      <ConversationItem
        key={item.index}
        avatar={avatar}
        name={name}
        lastMessage={lastMessage}
        lastTime={lastTime}
        isSeen={isSeen}
      />
      <View style={styles.divider} />
      </TouchableOpacity>
    );
  };

  const handleChatItemClick = ({ chatitem }:any) => {
    console.log('hsghgjxghdgfhcdfgskugug', chatitem)
    // navigation.navigate('Chat', { itemData: item });
  };
  const renderHeader = () => {
    return (
      <View>
        <AddChatHeader/>
        <SearchInput />
        <View style={styles.userListContainer}>
          <ScrollView horizontal style={styles.userList} showsHorizontalScrollIndicator={false}>
            <UserItem
              key='myStatus'
              name='Saumya'
              avatar='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUtcC5wbmc.png'
            />
            {users.map((user, index) => (
              <UserItem key={`${user.name}-${index}`} {...user} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <FlatList
        ListHeaderComponent={renderHeader}
        style={styles.flatList}
        data={listConversations}
        keyExtractor={keyExtractor}
        renderItem={( item:any ) => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: '#ddd', // Divider line color
    marginHorizontal: 10,
    marginBottom:10, // Adjust as needed
  },
  container: { flex: 1, paddingVertical: 16, backgroundColor: 'white' },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: AVATAR_SIZE * 1.2,
    height: AVATAR_SIZE * 1.2,
    borderRadius:18,
    backgroundColor:'red',
    // borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: { flex: 1, overflow: 'hidden' },
  content: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  messageContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: { fontSize: 14, color: 'gray', marginRight: 8, flex: 1 },
  lastTime: { fontSize: 14, color: 'gray' },
  seenIcon: { width: 16, height: 16, borderRadius: 8, marginLeft: 16 },
  unseenIcon: { width: 16, height: 16, borderRadius: 8, marginLeft: 16, backgroundColor: 'transparent' },
  userListContainer: { marginVertical: 8 },
  userList: { marginVertical: 16 },
  userItem: { marginHorizontal: 8 },
  onlineIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#6cd64f',
    position: 'absolute',
    top: 50,
    right: 8,
    zIndex: 1000,
    borderWidth: 3,
    borderColor: '#000',
  },
  onlineInnerCircle: { flex: 1, borderRadius: 5, backgroundColor: 'black', margin: 2 },
  userName: { width: 60, fontSize: 14, color: 'black', marginTop: 8, textAlign: 'center' },
  flatList: { paddingHorizontal: 16 },
});
