import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // navigation hook

import EventDetails from "../EventDetails";

function EventItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  date,
}) {
  const navigation = useNavigation(); // same as navigation prop through screen component

  function selectEventItemHandler() {
    navigation.navigate("EventDetail", {
      eventId: id,
    });
  }

  return (
    <View style={styles.eventItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectEventItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <EventDetails
            duration={duration}
            date={date}
            complexity={complexity}
          />
          <Text></Text>
        </View>
      </Pressable>
    </View>
  );
}

export default EventItem;

const styles = StyleSheet.create({
  eventItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
