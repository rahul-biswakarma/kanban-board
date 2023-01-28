import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
	apiKey: "AIzaSyCWROf4-XEsoSjl9b2D-7mCq6UODEYiCsA",
	authDomain: "kanban-kraft.firebaseapp.com",
	projectId: "kanban-kraft",
	storageBucket: "kanban-kraft.appspot.com",
	messagingSenderId: "814915101393",
	appId: "1:814915101393:web:70ce443c0f35a60309dbf0",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
