// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB-wzeUWRkycOvWKDK6MA2wEkwos264XIc",
  authDomain: "foody-5689b.firebaseapp.com",
  databaseURL: "https://foody-5689b-default-rtdb.firebaseio.com",
  projectId: "foody-5689b",
  storageBucket: "foody-5689b.appspot.com",
  messagingSenderId: "1029788892686",
  appId: "1:1029788892686:web:f8676352d229b20c54c65f",
  measurementId: "G-WLQQ9MKY5R"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_REGISTER_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
