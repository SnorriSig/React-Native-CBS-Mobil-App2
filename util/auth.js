import axios from "axios";
import { API_KEY } from "@env"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firestore.js'

async function authendicate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export async function createUser(email, password) {
  
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return authendicate("signUp", email, password);
}

export async function login(email, password) {

  try {
    const docRef = await addDoc(collection(db, "logging"), {
      email: email,
      date: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  return authendicate("signInWithPassword", email, password);
}
