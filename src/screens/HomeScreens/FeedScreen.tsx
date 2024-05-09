import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

interface FeedItem {
  id: number;
  profilePic: string;
  name: string;
  time: string;
  isActiveUser: boolean;
  postDescription: string;
  postPic: string;
  likes: number;
  shares: number;
  navigation:any
  countComments:number
}

export default function FeedItem({
  profilePic,
  name,
  time,
  isActiveUser,
  postDescription,
  postPic,
  likes,
  shares,
  navigation,
  countComments
}: FeedItem & { navigation: any }) {
  const handlePostPress = () => {
    // Navigate to the PostDetailScreen and pass the selected post as a parameter
    navigation.navigate('FullPostImage', { post: { profilePic, name, time, isActiveUser, postDescription, postPic, likes, shares } });
  };
  

  return (
    <View style={styles.feedItem}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.userInfo}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{color:'black'}}>{name} </Text>
              <Image height={20} width={20} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/01_Icon-Community%402x.png' }} />
            </View>
            <Text style={{color:'black'}}>{time}</Text>
          </View>
        </View>
        <Text style={styles.postDescription}>{postDescription}</Text>
      </View>
      <TouchableOpacity onPress={handlePostPress}>
      <Carousel
        data={postPics}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        layout="default"
      />
      </TouchableOpacity>
      <View style={styles.interactions}>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Like pressed')}>
            <Image source={require('../../assets/icons/like.png')} style={styles.iconImage} />
            <Text style={styles.interactionText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Comment pressed')}>
            <Image source={require('../../assets/icons/comment.png')} style={styles.iconImage} />
            <Text style={styles.interactionText}>{countComments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Share pressed')}>
            <Image source={require('../../assets/icons/share.png')} style={styles.iconImage} />
            <Text style={styles.interactionText}>{shares}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bookmarkContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Bookmark pressed')}>
            <Image source={require('../../assets/icons/bookmark.png')} style={styles.bookmarkImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  interactions: {
    flexDirection: 'row',// Change to 'flex-start'

    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingBottom:20
  },
  icons: {
    justifyContent: 'flex-start', 
    flexDirection: 'row',// Change to 'flex-start'
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  interactionText: {
    marginLeft: 5,
  },
  feedItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop:10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  activeUserButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  postDescription: {
    marginVertical: 10,
    color:'black'
  },
  postImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 10,
    flex:1
  },
 
  nteractions: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Change to 'flex-start'
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'column',

    marginRight: 10, // Add margin to separate the icons
  },
  // New styles
  bookmarkContainer: { // Change to column
    alignItems: 'flex-end', // Align to the right
  },
  bookmarkImage: {
    width: 20,
    height: 20,
    marginLeft: 10, // Reverse the margin direction
  },

});
