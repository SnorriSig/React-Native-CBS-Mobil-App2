import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventList from "../components/EventList/EventList";
import { fetchEventData } from "../util/eventsApi.js";

function FavoritesScreen() {
  const favoriteEventIds = useSelector((state) => state.favoriteEvents.ids);

  const [fetchedEvents, setFetchedEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const events = await fetchEventData("EVENTS");
      console.log("events", events);
      setFetchedEvents(events);
    }
    getEvents();
  }, []);
  
  const favoriteEvents = fetchedEvents.filter((event) =>
    favoriteEventIds.includes(event.id)
  );
  if (favoriteEvents.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite events.</Text>
      </View>
    );
  }
  return <EventList items={favoriteEvents} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
});