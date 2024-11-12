import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
import FoodRecommendations from "./components/FoodRecommendations";
import RecipeGenerator from "./components/RecipeGenerator";
import MentalHealthTracker from "./components/MentalHealthTracker";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import "./components/css/app.css";
import Hero from "./components/hero";
import "bootstrap/dist/css/bootstrap.min.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function NavbarComponent({ user, handleLogout }) {
  const location = useLocation();
  const hideNavbarPaths = ["/recipe-generator", "/mental-health"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  if (shouldHideNavbar) {
    return null;
  }


  return (
    <Navbar expand="lg" className="w-100 ">
      <Container fluid className="p-10 navbarcontain">
        <Navbar.Brand href="/">GEMINI GREENS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link href="/profile"></Nav.Link>
                <Nav.Link href="/food-recommendations"></Nav.Link>
                <Nav.Link href="/recipe-generator"></Nav.Link>
                <Nav.Link href="/mental-health"></Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
  };

  return (
    <Router>
      <main className="p-0 m-0 w-100 h-100">
        <div
          className="d-flex flex-column"
          style={{ height: "850px", gap: "30px" }}
        >
          <div className="d-flex flex-column h-100 w-100">
            <NavbarComponent user={user} handleLogout={handleLogout} />
            <Container fluid className="flex-grow-1  px-0">
              <Routes>
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/"
                  element={
                    user ? <Dashboard user={user} /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    user ? (
                      <UserProfile user={user} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/food-recommendations"
                  element={
                    user ? (
                      <FoodRecommendations user={user} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/recipe-generator"
                  element={
                    user ? (
                      <RecipeGenerator user={user} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/mental-health"
                  element={
                    user ? (
                      <MentalHealthTracker user={user} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </Container>
          </div>
          <Hero />
        </div>
      </main>
    </Router>
  );
}

export default App;