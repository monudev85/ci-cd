import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";

interface User {
  id: number;
  name: string;
  type: "hive" | "mate";
  profilePic: string; 
  stories:any// URL or local path to the profile picture
}

const users: User[] = [
  {
    id: 1,
    name: "Saumya",
    type: "hive",
    profilePic:
      "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.webp?b=1&s=170667a&w=0&k=20&c=3F13TK1sFr-mxCGZtQU_JhmvqrBHetLJo3rHx6QFTiw=",

    stories: [
      "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
      "https://png.pngtree.com/thumb_back/fh260/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg",
    ],
  },
  {
    id: 2,
    name: "Prerna",
    type: "mate",
    profilePic:
     "https://media.istockphoto.com/id/1467039986/photo/beautiful-smiling-curly-haired-businesswoman-using-smartphone-in-office-copy-space.webp?b=1&s=170667a&w=0&k=20&c=CJiGVd_UTeKi7WUR1PoDAD6UqKz9GDao686GEbsU35c=",
  stories: [
    "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
  ],
    },
  {
    id: 3,
    name: "Preeti",
    type: "hive",
    profilePic:
      "https://media.istockphoto.com/id/1420486889/photo/candid-portrait-of-young-middle-eastern-digital-native.webp?b=1&s=170667a&w=0&k=20&c=XZ57XDmNuS_eOtXdKpEFeMmen4hIKoHGeZ89B4HHOYY=",
      stories: [
        "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg",
      ],
    },
  {
    id: 4,
    name: "Mohit",
    type: "mate",
    profilePic:
      "https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.webp?b=1&s=170667a&w=0&k=20&c=YFwXXbAFfDtX7-2iNcbH6N-ttS3CcnMt7rlUlwIXZ2g=",
      stories: [
        "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg",
      ],
    },
  {
    id: 5,
    name: "Monu",
    type: "mate",
    profilePic:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      stories: [
        "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
      ],
    },
  {
    id: 6,
    name: "Shubhi",
    type: "hive",
    profilePic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      stories: [
        "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
      ],
    },
  {
    id: 7,
    name: "Kaif",
    type: "hive",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      stories: [
        "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
      ],
    },
  {
    id: 8,
    name: "Pushpraj",
    type: "mate",
    profilePic:
      "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      stories: [
        "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
      ],
    },
];

export default function ActiveUser({ navigation }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.userListContainer}
    ><TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.userBox, { marginTop: 15 }]}>
          <View
            style={{
              width: 60, // Adjust width as needed
              height: 60, // Adjust height as needed
              borderWidth: 2,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/32/32339.png",
              }}
            ></Image>
          </View>
        </View>
        <View>
          <Text
            style={{
              marginTop: 5,
              color: "black",
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            Share Story
          </Text>
        </View>
      </View>
      </TouchableOpacity >
      {users.map((user) => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            key={user.id}
            style={[
              styles.userBox,
              { borderColor: user.type === "hive" ? "green" : "green" },
              { borderStyle: user.type === "mate" ? "dashed" : "solid" },
            ]}
            onPress={()=>navigation.navigate('StoryViewer', {Stories:user.stories,Name:user.name,ProfilePic:user.profilePic})}
          >
            <Image
              source={{ uri: user.profilePic }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 5,
              color: "black",
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            {user.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userListContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  userBox: {
    width: 68, // Adjust width as needed
    height: 68, // Adjust height as needed
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 56, // Adjust width as needed
    height: 56, // Adjust height as needed
    borderRadius: 18, // half of the width and height to make it circular
  },
});
