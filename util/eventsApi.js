import { db } from "./firestore.js";
import { collection, getDocs } from "firebase/firestore";

export async function fetchEventData(mode) {
  try {
    const eventsCol = collection(db, mode);
    const eventSnapshot = await getDocs(eventsCol);
    const eventList = [];
    eventSnapshot.forEach((doc) => {
      eventList.push(doc.data());
    });
    return eventList;
  } catch (e) {
    console.log(e);
  }
}
