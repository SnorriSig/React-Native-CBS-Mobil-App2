import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites";
import eventsReducer from "./events";

// Reducers are diffrent slice of the state, of data
// and actions that can change the data that are used by Redux
// then construct over all state of the store and actions
export const store = configureStore({
  reducer: {
    favoriteEvents: favoritesReducer,
    loadEvents: eventsReducer,
  },
});
