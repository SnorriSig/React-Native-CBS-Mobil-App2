import { useEffect, useLayoutEffect, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView, } from "react-native";

import IconButton from "../components/UI/IconButton";
import List from "../components/EventDetail/List";
import Subtitle from "../components/EventDetail/Subtitle";
import EventDetails from "../components/EventDetails";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventData } from "../util/eventsApi.js";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function EventDetailScreen({ route, navigation }) {
  const [fetchedEvents, setFetchedEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const events = await fetchEventData("EVENTS");
      setFetchedEvents(events);
    }
    getEvents();
  }, []);

  // special redux hook to retrive information from redux store (useSelector)
  const favoriteEventIds = useSelector((state) => state.favoriteEvents.ids);
  const dispatch = useDispatch();

  const eventId = route.params.eventId;

  const selectedEvent = fetchedEvents.find((event) => event.id === eventId);

  // Check if favoriteEventIds array includes this id
  const eventIsFavorite = favoriteEventIds.includes(eventId);

  function changeFavoriteStatusHandler() {
    if (eventIsFavorite) {
      dispatch(removeFavorite({ id: eventId }));
    } else {
      dispatch(addFavorite({ id: eventId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            size={24}
            icon={eventIsFavorite ? "star" : "star-outline"}
            color="#4967AA"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  if (selectedEvent === undefined) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedEvent.imageUrl }} />
      <Text style={styles.title}>{selectedEvent.title}</Text>
      <EventDetails
        duration={selectedEvent.duration}
        complexity={selectedEvent.complexity}
        date={selectedEvent.date}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Event information</Subtitle>
          <List data={selectedEvent.information} />
          <Subtitle>Event details</Subtitle>
          <List data={selectedEvent.details} />
        </View>
      </View>
    </ScrollView>
  );
}

export default EventDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    color: "black",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
