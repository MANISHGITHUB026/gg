import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    chronicConditions: "",
  });
  const [message, setMessage] = useState("");

  const db = getFirestore();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "userProfiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      };

      fetchProfile();
    }
  }, [user, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userProfiles", user.uid), profile);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (!user) {
    return <Alert variant="warning">Please log in to view your profile.</Alert>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {message && (
        <Alert variant={message.includes("Error") ? "danger" : "success"}>
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Chronic Health Conditions</Form.Label>
          <Form.Control
            as="textarea"
            name="chronicConditions"
            value={profile.chronicConditions}
            onChange={handleChange}
            placeholder="List any chronic health conditions"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}
