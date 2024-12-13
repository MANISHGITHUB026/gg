import React from "react";
import { Brain, ChefHat, Gauge, LogOut, User2, Utensils } from 'lucide-react';
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
  const cardStyle = {
    backgroundColor: '#1a1225',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    height: '100%',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    position: 'relative',
  };

  const cardBeforeStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    margin: '-2px',
    borderRadius: 'inherit',
    background: 'linear-gradient(to right, #9333ea, #d946ef)',
  };

  const iconStyle = {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  };

  return (
    <div className="min-h-screen bg-[#0a060f] text-white">

      <Container className="py-8">
      <div className="tagline">
  <h2 className="taglinefont">
    <span className="welcome">Welcome</span>
    <span className="health-dashboard"> to Your Health Dashboard</span>
  </h2>
</div>


        <Row className="g-4">
          {/* User Profile Card */}
          <Col md={6}>
            <div className="bg-[#1a1225] rounded-lg p-6 Cardbg">
            <div className="  custom-box">
            <User2 size={24} className="text-purple-500" />
            </div>
              <h3 className="text-xl font-semibold mb-2">User Profile</h3>
              <p className="text-gray-400 mb-4">
                {profile ? (
                  <>
                    Age: {profile.age}<br />
                    Weight: {profile.weight} kg
                  </>
                ) : (
                  "Complete your health profile to get personalized recommendations"
                )}
              </p>
              <Link to="/profile">
                <button className="w-full bg-[#9333ea] text-white py-2 rounded-lg hover:bg-[#7928ca] transition-colors">
                  {profile ? "Update Profile" : "Set Up Profile"}
                </button>
              </Link>
            </div>
          </Col>

          {/* Food Recommendations Card */}
          <Col md={6}>
            <div className="bg-[#1a1225] rounded-lg p-6 Cardbg">
            <div className="  custom-box">
            <Utensils size={24} className="text-indigo-500" />
            </div>
              <h3 className="text-xl font-semibold mb-2">Food Recommendations</h3>
              <p className="text-gray-400 mb-4">Get personalized food recommendations based on your health profile</p>
              <Link to="/food-recommendations">
                <button className="w-full bg-[#9333ea] text-white py-2 rounded-lg hover:bg-[#7928ca] transition-colors">
                  View Recommendations
                </button>
              </Link>
            </div>
          </Col>

          {/* Recipe Generator Card */}
          <Col md={6}>
            <div className="bg-[#1a1225] rounded-lg p-6 Cardbg">
            <div className="  custom-box">
            <ChefHat size={24} className="text-green-500" />
            </div>
              <h3 className="text-xl font-semibold mb-2">Recipe Generator</h3>
              <p className="text-gray-400 mb-4">Generate healthy recipes based on your preferences and ingredients</p>
              <Link to="/recipe-generator">
                <button className="w-full bg-[#9333ea] text-white py-2 rounded-lg hover:bg-[#7928ca] transition-colors">
                  Generate Recipes
                </button>
              </Link>
            </div>
          </Col>

          {/* Mental Health Tracker Card */}
          <Col md={6}>
            <div className="bg-[#1a1225] rounded-lg p-6 Cardbg">
            <div className="  custom-box">
            <Brain size={24} className="text-blue-500" />
            </div>
              <h3 className="text-xl font-semibold mb-2">Mental Health Tracker</h3>
              <p className="text-gray-400 mb-4">Track your mental health and get personalized recommendations</p>
              <Link to="/mental-health">
                <button className="w-full bg-[#9333ea] text-white py-2 rounded-lg hover:bg-[#7928ca] transition-colors">
                  Track Mental Health
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

