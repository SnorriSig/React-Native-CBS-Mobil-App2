import { useLayoutEffect, useState, useEffect } from "react";

import EventList from "../components/EventList/EventList";
import { fetchEventData } from "../util/eventsApi.js";

function EventOverviewScreen({ route, navigation }) {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedEvents, setFetchedEvents] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchEventData("CATEGORIES");
      setFetchedCategories(categories);
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getEvents() {
      const events = await fetchEventData("EVENTS");
      setFetchedEvents(events);
    }
    getEvents();
  }, []);

  const catId = route.params.categoryId;

  const displayedEvents = fetchedEvents.filter((eventItem) => {
    return eventItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = fetchedCategories.find(
      (category) => category.id === id
    );

    // sets the options for the screen here - insted of in navigation => title for header
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <EventList items={displayedEvents} />;
}

export default EventOverviewScreen;
