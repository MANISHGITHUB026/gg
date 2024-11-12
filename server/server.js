import express from "express";
import { Marked, marked } from "marked";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/firebaseConfig.js"; // Import Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import
// Firebase Auth
const app = express();
const PORT = 3001;
// Initialize Firebase Authentication
const auth = getAuth();
// Replacing useState with normal variables
let allergies = [];
let chronicDiseases = [];
let uid = null;
let docExists = false;
// Function to simulate useEffect for Firebase auth monitoring
const monitorAuthState = () => {
onAuthStateChanged(auth, (user) => {
if (user) {
uid = user.uid;
checkUserDoc(user.uid);
fetchDocument(user.uid);
} else {
uid = null;
}
});
};
// Call this function at the start (like useEffect in React)
monitorAuthState();
// Fetch user document from Firestore
const fetchDocument = async (userId) => {
try {
const userDocRef = doc(db, "Demographics", userId);
const userDoc = await getDoc(userDocRef);
if (userDoc.exists()) {
const data = userDoc.data();
allergies = data.Allergies || [];
chronicDiseases = data.ChronicDiseases || [];
docExists = true;
}
} catch (error) {
console.error("Error fetching document:", error);
}
};
// Enable CORS for all routes
app.use(cors());
// API key setup and AI content generation
const API_KEY = "AIzaSyBxctOxkKSE7bKE7cinns0STxI78N_a7qs";
const genAI = new GoogleGenerativeAI(API_KEY);
// Define the `run` function here before using it
async function run(prompt, callback) {
try {
const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash-latest",
});
const result = await model.generateContent(prompt);
const response = result.response;
if (
response &&
response.candidates &&
response.candidates[0] &&
response.candidates[0].content &&
response.candidates[0].content.parts
) {
const generatedText = marked(
response.candidates[0].content.parts.map((part) =>
part.text).join("\n")
);
console.log("Generated Text:", generatedText);
callback(generatedText); // Send the generated text to the client
} else {
console.log("No valid response structure found.");
}
} catch (error) {
console.error("Error generating content:", error);
}
}
// SSE Endpoint to stream recipe data
app.get("/recipestream", (req, res) => {
const { ingredients, mealType, cuisine, cookingTime, complexity } =
req.query;
console.log(req.query);
res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");
res.flushHeaders(); // Flush headers immediately to establish SSE connection
const sendEvent = (response) => {
console.log(response);
res.write(`data: ${response}\n\n`); // Send the response as SSE
event
};
const prompt = [
"Generate a recipe that incorporates the following details:",
`[Ingredients: ${ingredients}]`,
`[Meal Type: ${mealType}]`,
`[Cuisine Preference: ${cuisine}]`,
`[Cooking Time: ${cookingTime}]`,
`[Complexity: ${complexity}]`,
"Please provide a detailed recipe, including steps for preparationand cooking. Only use the ingredients provided.",
"The recipe should highlight the fresh and vibrant flavors of the ingredients.",
"Also give the recipe a suitable name in its local language based on cuisine preference.",
];
run(prompt, sendEvent);
console.log("Request processed");
// End connection when client closes it
req.on("close", () => {
console.log("Client disconnected");
res.end();
});
});
// Test the `run` function with a sample prompt
const testPrompt = "Hi";
run([testPrompt], (response) => console.log("Test Response:",
response));
// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
console.log(API_KEY);
})