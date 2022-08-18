import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

import { useEffect, useState } from "react";
import { fetchEventData } from "../util/eventsApi.js";

function CategoriesScreen({ navigation }) {
const [fetchedCategories, setFetchedCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchEventData("CATEGORIES");
      setFetchedCategories(categories)
  }

  getCategories();
}, []);
    
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("EventOverview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <FlatList
      data={fetchedCategories}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;