import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./css/dashboard.css"
// import "./javascript/dashboard.js"

export default function Dashboard({ user }) {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "userProfiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  React.useEffect(() => {
    const canvas = document.getElementById("test");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      // Your canvas-related code here
    }
  }, []);
  

  if (!user) {
    return (
      <Container>
        <h1>Welcome to GeminiGreens</h1>
        <p>Please log in to access your personalized health dashboard.</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
    <canvas id="test">
    </canvas>
    <h1 id="test2" > GEMINI GREENS </h1>
  {/* <h1>Welcome to Your Health Dashboard</h1> */}
  <div>Welcome</div> 
<div> 
  <span>to Your Health Dashboard</span>
</div>
  <Row className="mt-4">
    <Col md={6} lg={4} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            {profile ? (
              <>
                Age: {profile.age}
                <br />
                Weight: {profile.weight} kg
              </>
            ) : (
              "Profile not set up yet."
            )}
          </Card.Text>
          <Link to="/profile">
            <Button variant="primary">
              {profile ? "Update Profile" : "Set Up Profile"}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} lg={4} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>Food Recommendations</Card.Title>
          <Card.Text>
            Get personalized food recommendations based on your health profile.
          </Card.Text>
          <Link to="/food-recommendations">
            <Button variant="primary">View Recommendations</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} lg={4} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>Recipe Generator</Card.Title>
          <Card.Text>
            Generate healthy recipes based on your preferences and available ingredients.
          </Card.Text>
          <Link to="/recipe-generator">
            <Button variant="primary">Generate Recipes</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} lg={4} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>Mental Health Tracker</Card.Title>
          <Card.Text>
            Track your mental health and get personalized recommendations.
          </Card.Text>
          <Link to="/mental-health">
            <Button variant="primary">Track Mental Health</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
}
