import { View, FlatList, StyleSheet } from "react-native";
import EventItem from "./EventItem";

function EventList({ items }) {
  function renderEventItem(itemData) {
    const item = itemData.item;

    const eventItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      date: item.date,
    };
    return <EventItem {...eventItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
      />
    </View>
  );
}

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
