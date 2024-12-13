import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusCircle, X, User, Calendar, Weight, Ruler, Users } from 'lucide-react';
import "./css/profile.css"

export default function Profile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [uid, setUid] = useState(null);
  const [docExists, setDocExists] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [allergyToggle, setAllergyToggle] = useState(false);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [chronicDiseases, setChronicDiseases] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        checkUserDoc(user.uid);
        fetchUserDetails(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkUserDoc = async (userId) => {
    const userDocRef = doc(db, "Demographics", userId);
    const userDoc = await getDoc(userDocRef);
    setDocExists(userDoc.exists());
  };

  const fetchUserDetails = async (userId) => {
    try {
      const userDocRef = doc(db, "Demographics", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.Name);
        setGender(data.Gender);
        setHeight(data.Height);
        setWeight(data.Weight);
        setAge(data.Age);
        setAllergies(data.Allergies || []);
        setChronicDiseases(data.ChronicDiseases || []);
        setDocExists(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching your details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      toast.error("You must be logged in to submit details.");
      return;
    }

    try {
      console.log("Submitting data for UID:", uid);
      const userDocRef = doc(db, "Demographics", uid);
      const userDoc = await getDoc(userDocRef);

      const data = {
        Name: name,
        Gender: gender,
        Height: height,
        Weight: weight,
        Age: age,
        Allergies: allergies,
        ChronicDiseases: chronicDiseases
      };

      console.log("Data to be submitted:", data);

      if (userDoc.exists()) {
        console.log("Updating existing document");
        await updateDoc(userDocRef, data);
        toast.success("Details updated successfully!");
      } else {
        console.log("Creating new document");
        await setDoc(userDocRef, data);
        toast.success("Details submitted successfully!");
      }

      console.log("Operation completed successfully");
      fetchUserDetails(uid);
    } catch (error) {
      console.error("Detailed error:", error);
      if (error.code === "permission-denied") {
        toast.error("Permission denied. Please check your Firebase security rules.");
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput("");
      setAllergyToggle(false);
    }
  };

  const handleAddChronicDisease = (disease) => {
    if (!chronicDiseases.includes(disease)) {
      setChronicDiseases([...chronicDiseases, disease]);
    }
    setDropdownVisible(false);
  };

  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const removeChronicDisease = (index) => {
    setChronicDiseases(chronicDiseases.filter((_, i) => i !== index));
  };

  return (
    <div className="full-screen d-flex align-items-center justify-content-center">
      <ToastContainer />
      <div className="container py-5">
        <h1 className="text-center text-primary mb-5 float-animation">User Profile</h1>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card shadow-sm pulse-animation">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Personal Information</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        <User size={18} className="me-2" />Name
                      </label>
                      <input
                        type="text"
                        className="form-control unique-input"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="age" className="form-label">
                        <Calendar size={18} className="me-2" />Age
                      </label>
                      <input
                        type="number"
                        className="form-control unique-input"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="weight" className="form-label">
                        <Weight size={18} className="me-2" />Weight (kg)
                      </label>
                      <input
                        type="number"
                        className="form-control unique-input"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="height" className="form-label">
                        <Ruler size={18} className="me-2" />Height (cm)
                      </label>
                      <input
                        type="number"
                        className="form-control unique-input"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="gender" className="form-label">
                        <Users size={18} className="me-2" />Gender
                      </label>
                      <select
                        className="form-select unique-input"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn submit-button mt-4">
                    {docExists ? "Update Profile" : "Create Profile"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm mb-4 float-animation">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Chronic Diseases</h5>
                <button
                  className="circle-button"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <PlusCircle size={24} />
                </button>
              </div>
              <div className="card-body">
                {dropdownVisible && (
                  <select
                    className="form-select mb-3 unique-input"
                    onChange={(e) => handleAddChronicDisease(e.target.value)}
                  >
                    <option value="">Add chronic disease</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Heart Disease">Heart Disease</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Obesity">Obesity</option>
                  </select>
                )}
                <ul className="list-group">
                  {chronicDiseases.map((disease, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {disease}
                      <button
                        className="btn btn-outline-danger btn-sm circle-button"
                        onClick={() => removeChronicDisease(index)}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card shadow-sm float-animation">
              <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Allergies</h5>
                <button
                  className="circle-button"
                  onClick={() => setAllergyToggle(!allergyToggle)}
                >
                  <PlusCircle size={24} />
                </button>
              </div>
              <div className="card-body">
                {allergyToggle && (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control unique-input"
                      placeholder="Enter allergy"
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                    />
                    <button className="btn submit-button" type="button" onClick={handleAddAllergy}>
                      Add
                    </button>
                  </div>
                )}
                <ul className="list-group">
                  {allergies.map((allergy, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {allergy}
                      <button
                        className="btn btn-outline-danger btn-sm circle-button"
                        onClick={() => removeAllergy(index)}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

