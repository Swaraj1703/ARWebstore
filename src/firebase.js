import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUd87UdomtSbbYGxbHD5ZaQN9lveJtGbg",
  authDomain: "sleek-spaces.firebaseapp.com",
  projectId: "sleek-spaces",
  storageBucket: "sleek-spaces.firebasestorage.app",
  messagingSenderId: "144653222162",
  appId: "1:144653222162:web:d50580af4f267d60e933cb",
  measurementId: "G-V3ZCMCY56M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and set up Firebase Auth with persistence
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to browserLocalPersistence.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Initialize Firestore
const db = getFirestore(app);

// Helper function to add an order
export const addOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, "orders"); // Reference to the "orders" collection
    const docRef = await addDoc(ordersCollection, orderData); // Add the order to Firestore
    console.log("Order placed with ID:", docRef.id); // Log the document ID for the new order
    return docRef.id;
  } catch (error) {
    console.error("Error placing order:", error); // Handle errors gracefully
    throw error; // Re-throw the error for further handling
  }
};

// Export Firebase services
export { auth, db };
