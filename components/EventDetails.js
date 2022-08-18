import { View, Text, StyleSheet } from "react-native";

function EventDetails({duration, complexity, date, style, textStyle}) {
  return (
    <View style={[styles.detail, style]}>
      <Text style={[styles.detailItem, textStyle]}>{duration} min</Text>
      <Text style={[styles.detailItem, textStyle]}>{complexity.toUpperCase()}</Text>
      <Text style={[styles.detailItem, textStyle]}>{date.toUpperCase()}</Text>
    </View>
  );
}

export default EventDetails;

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
