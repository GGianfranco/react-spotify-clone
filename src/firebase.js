import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  deleteDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logInAsGuest() {
  return signInAnonymously(auth);
}

export function logOut() {
  return signOut(auth);
}

export async function getPlaylist(playlistId) {
  const documentReference = doc(db, `playlists/${playlistId}`);
  const documentSnapshot = await getDoc(documentReference);
  return documentSnapshot.exists() ? { ...documentSnapshot.data() } : null;
}

export async function getCategories() {
  const collectionReference = collection(db, "categories");
  const querySnapshot = await getDocs(collectionReference);
  return querySnapshot.docs.map((queryDocumentSnapshot) =>
    queryDocumentSnapshot.data()
  );
}

export async function getFeaturedPlaylists(day) {
  const collectionReference = collection(db, "featuredPlaylists");
  const collectionQuery = query(
    collectionReference,
    where("day", "==", day.toLowerCase())
  );
  const querySnapshot = await getDocs(collectionQuery);
  return { ...querySnapshot.docs[0].data() };
}

export async function likeTrack(userId, track) {
  const documentReference = doc(
    db,
    `users/${userId}/likedTracks/${track.trackId}`
  );
  const documentSnapshot = await getDoc(documentReference);
  if (documentSnapshot.exists()) {
    deleteDoc(documentReference);
  } else {
    setDoc(documentReference, track);
  }
}

export async function likePlaylist(userId, playlist) {
  const documentReference = doc(
    db,
    `users/${userId}/likedPlaylists/${playlist.playlistId}`
  );
  const documentSnapshot = await getDoc(documentReference);
  if (documentSnapshot.exists()) {
    deleteDoc(documentReference);
  } else {
    setDoc(documentReference, playlist);
  }
}

export function useAuth(component) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return () => unsubscribe();
  }, []);
  return currentUser;
}

export function useUserLikedPlaylists(userId) {
  const [userLikedPlaylists, setUserLikedPlaylists] = useState();
  const path = `users/${userId}/likedPlaylists`;
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) =>
      setUserLikedPlaylists(snapshot.docs.map((doc) => ({ ...doc.data() })))
    );
    return () => unsubscribe();
  }, [userId]);
  return userLikedPlaylists;
}

export function useUserLikedTracks(userId) {
  const [userLikedTracks, setUserLikedTracks] = useState();
  const path = `users/${userId}/likedTracks`;
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) =>
      setUserLikedTracks(snapshot.docs.map((doc) => ({ ...doc.data() })))
    );
    return () => unsubscribe();
  }, [userId]);
  return userLikedTracks;
}

export function useTrackLiked(userId, trackId) {
  const [trackLiked, setTrackLiked] = useState();
  const path = `users/${userId}/likedTracks/${trackId}`;
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) =>
      setTrackLiked(snapshot.exists())
    );
    return () => unsubscribe();
  }, [userId, trackId]);
  return trackLiked;
}

export function usePlaylistLiked(userId, playlistId) {
  const [playlistLiked, setPlaylistLiked] = useState();
  const path = `users/${userId}/likedPlaylists/${playlistId}`;
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) =>
      setPlaylistLiked(snapshot.exists())
    );
    return () => unsubscribe();
  }, [userId, playlistId]);
  return playlistLiked;
}
