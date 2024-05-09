import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface User {
  profileImage: string;
  coverPhoto: string;
  posts: number;
  followers: number;
  following: number;
  postsData: {
    images: string[];
  };
}

export default function ProfileScreen({ navigation,route }: any) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);


  const tabIcons: Record<string, string> = {
    all: "ios-images",
    photos: "images-outline",
    reels: "ios-film",
  };

  const user: User = {
    profileImage:
      "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    coverPhoto:
      "https://i.pinimg.com/736x/01/35/f3/0135f3c592342631da4308a8b60b98bc.jpg",
    posts: 39,
    followers: 339,
    following: 393,
    postsData: {
      images: [
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://st.depositphotos.com/1000686/3738/i/450/depositphotos_37383675-stock-photo-portrait-of-a-young-beautiful.jpg",
        "https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg",
        "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://st.depositphotos.com/1000686/3738/i/450/depositphotos_37383675-stock-photo-portrait-of-a-young-beautiful.jpg",
        "https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg",
        "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        // Add more images as needed
      ],
    },
  };

  const generateRandomUsername = (): string => {
    const adjectives = [
      "Happy",
      "Creative",
      "Adventurous",
      "Ambitious",
      "Clever",
    ];
    const nouns = ["Explorer", "Dreamer", "Traveler", "Artist", "Developer"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}`;
  };

  const generateRandomBio = (): string => {
    const bioOptions = [
      "Passionate about life and adventures.",
      "Creating memories one day at a time.",
      "Dream big, work hard, stay focused.",
      "In love with coding and creativity.",
      "Exploring the world with a curious mind.",
    ];
    return bioOptions[Math.floor(Math.random() * bioOptions.length)];
  };

  const renderHeader = (): JSX.Element => {
    const { profileImage, coverPhoto, posts, followers, following } = user;
    const randomUsername = generateRandomUsername();
    const randomBio = generateRandomBio();

    return (
      <View style={styles.profileHeader}>
        <Image style={styles.coverPhoto} source={{ uri: coverPhoto }} />
        <View style={styles.avatarContainer}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{ uri: profileImage }} />
          </View>
          
        </View>       
        <View  style={{justifyContent:'flex-end',alignItems:'flex-end',padding:10,borderTopRightRadius:30}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
        <Image source={require('../../assets/icons/settings.png')}></Image>
        </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{posts}</Text>
            <Text style={styles.statsLabel}>Posts</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{followers}</Text>
            <Text style={styles.statsLabel}>Hive</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{following}</Text>
            <Text style={styles.statsLabel}>Mates</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.tabsContainer}>
          {Object.keys(tabIcons).map((tabKey) => (
            <TouchableOpacity
              key={tabKey}
              onPress={() => setActiveTab(tabKey)}
              style={[styles.tab, activeTab === tabKey && styles.activeTab]}
            >
              <Icon name={tabIcons[tabKey]} size={20} color="#555" />
              <Text style={styles.tabText}>
                {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const filteredPosts =
    activeTab === "all"
      ? user.postsData.images.map((image, index) => ({
          id: index.toString(),
          type: index % 3 === 0 ? "reel" : "photo",
          images: { standard_resolution: { url: image } },
        }))
      : user.postsData.images
          .filter((_, index) =>
            activeTab === "reels" ? index % 3 === 0 : index % 3 !== 0
          )
          .map((image, index) => ({
            id: index.toString(),
            type: "photo",
            images: { standard_resolution: { url: image } },
          }));

          const renderItem = ({ item }: { item: { images?: { standard_resolution: { url: string } } } }): JSX.Element => {
            const imageUri = item.images?.standard_resolution?.url;
          
            return (
              <TouchableOpacity style={styles.gridImgContainer}>
                {imageUri && (
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: imageUri }}
                  />
                )}
              </TouchableOpacity>
            );
          };
          
          

  const renderFullImageModal = (): JSX.Element => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            resizeMode="contain"
            style={{ width: width, height: height }}
            source={{ uri: selectedImage || "" }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="ios-close-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        numColumns={3}
        data={filteredPosts}
        renderItem={( item:any ) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
      {renderFullImageModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  gridImgContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    backgroundColor: "red",
  },
  image: {
    flex: 1,
  },
  randomUsername: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  randomBio: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  profileHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  coverPhoto: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderBottomStartRadius:20,
    borderBottomEndRadius:20
  },
  avatarContainer: {
    position: "absolute",
    top: 140,
    left: width / 2 - 80,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 3,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 70,
  },
  statsContainer: {
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statsLabel: {
    fontSize: 14,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
});
