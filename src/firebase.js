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

// Initialize Firebase Auth
const auth = getAuth(app);

// Set Firebase Auth persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to browserLocalPersistence.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error.message);
  });

// Initialize Firestore
const db = getFirestore(app);

/**
 * Helper function to add an order to Firestore
 * @param {Object} orderData - The order details (items, totalPrice, address, userId, etc.)
 * @returns {Promise<string>} - Returns the document ID of the placed order
 */
export const addOrder = async (orderData) => {
  if (!orderData || Object.keys(orderData).length === 0) {
    throw new Error("Invalid order data. Cannot place an empty order.");
  }

  try {
    const ordersCollection = collection(db, "orders"); // Reference to the "orders" collection
    const docRef = await addDoc(ordersCollection, orderData); // Add the order to Firestore
    console.log("Order placed with ID:", docRef.id); // Log the document ID
    return docRef.id;
  } catch (error) {
    console.error("Error placing order in Firestore:", error.message);
    throw error; // Re-throw the error for further handling
  }
};

// Export Firebase services
export { auth, db };
