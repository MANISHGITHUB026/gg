// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyA6NZPtqw8t4FyQvXqwxiVQBHLTR7nvgys",
//   authDomain: "geminigreens-51033.firebaseapp.com",
//   projectId: "geminigreens-51033",
//   storageBucket: "geminigreens-51033.firebasestorage.app",
//   messagingSenderId: "944162892662",
//   appId: "1:944162892662:web:fd28691b4f3a02077aa857",
//   measurementId: "G-0RSRYLYTJ3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// export { db };

// // export { firebaseConfig };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA6NZPtqw8t4FyQvXqwxiVQBHLTR7nvgys",
  authDomain: "geminigreens-51033.firebaseapp.com",
  projectId: "geminigreens-51033",
  storageBucket: "geminigreens-51033.firebasestorage.app",
  messagingSenderId: "944162892662",
  appId: "1:944162892662:web:fd28691b4f3a02077aa857",
  measurementId: "G-0RSRYLYTJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(console.error);
}

// Initialize Firestore
const db = getFirestore(app);

export { db };
