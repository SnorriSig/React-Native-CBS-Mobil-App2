import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    addEvents: (state, action) => {
      state.events.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const addEvents = eventsSlice.actions.addEvents;
export default eventsSlice.reducer;
