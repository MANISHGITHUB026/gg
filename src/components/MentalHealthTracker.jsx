import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/MentalHealthTracker.css"

const moodEmojis = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
};

const activityCategories = [
  { name: "Exercise", icon: "🏃‍♂️" },
  { name: "Meditation", icon: "🧘‍♀️" },
  { name: "Reading", icon: "📚" },
  { name: "Music", icon: "🎵" },
  { name: "Cooking", icon: "🍳" },
  { name: "Socializing", icon: "👥" },
  { name: "Work", icon: "💼" },
  { name: "Gaming", icon: "🎮" },
  { name: "Art", icon: "🎨" },
];

const allSuggestions = {
  Exercise: [
    {
      title: "Go for a run",
      description: "A quick run can boost your mood and energy.",
      buttonText: "Start running",
      color: "success",
      icon: "🏃‍♂️",
    },
    {
      title: "Try yoga",
      description: "Yoga can help reduce stress and improve flexibility.",
      buttonText: "Begin yoga",
      color: "info",
      icon: "🧘‍♀️",
    },
  ],
  Meditation: [
    {
      title: "Practice mindfulness",
      description: "A 10-minute mindfulness session can calm your mind.",
      buttonText: "Start meditation",
      color: "primary",
      icon: "🧘‍♀️",
    },
    {
      title: "Deep breathing",
      description: "Try some deep breathing exercises to relax.",
      buttonText: "Start breathing",
      color: "info",
      icon: "💨",
    },
  ],
  Reading: [
    {
      title: "Read a book",
      description: "Immerse yourself in a good book to relax and learn.",
      buttonText: "Start reading",
      color: "warning",
      icon: "📚",
    },
    {
      title: "Join a book club",
      description: "Discuss your favorite books with others.",
      buttonText: "Find a club",
      color: "success",
      icon: "👥",
    },
  ],
  Music: [
    {
      title: "Listen to calming music",
      description: "Relax with some soothing tunes.",
      buttonText: "Play music",
      color: "primary",
      icon: "🎵",
    },
    {
      title: "Learn an instrument",
      description: "Challenge yourself by learning a new instrument.",
      buttonText: "Start learning",
      color: "warning",
      icon: "🎸",
    },
  ],
  Cooking: [
    {
      title: "Try a new recipe",
      description: "Experiment with a new dish to boost creativity.",
      buttonText: "Find recipes",
      color: "success",
      icon: "🍳",
    },
    {
      title: "Bake something",
      description: "Baking can be a relaxing and rewarding activity.",
      buttonText: "Start baking",
      color: "warning",
      icon: "🍪",
    },
  ],
  Socializing: [
    {
      title: "Call a friend",
      description: "Reach out to a friend for a chat.",
      buttonText: "Make a call",
      color: "primary",
      icon: "📞",
    },
    {
      title: "Plan a get-together",
      description: "Organize a small gathering with friends.",
      buttonText: "Plan event",
      color: "info",
      icon: "🗓️",
    },
  ],
  Work: [
    {
      title: "Set goals",
      description: "Define clear, achievable goals for your work.",
      buttonText: "Set goals",
      color: "primary",
      icon: "🎯",
    },
    {
      title: "Take regular breaks",
      description: "Remember to take short breaks to stay productive.",
      buttonText: "Set reminders",
      color: "warning",
      icon: "☕",
    },
  ],
  Gaming: [
    {
      title: "Play a relaxing game",
      description: "Choose a game that helps you unwind.",
      buttonText: "Find games",
      color: "success",
      icon: "🎮",
    },
    {
      title: "Join an online community",
      description: "Connect with other gamers who share your interests.",
      buttonText: "Find community",
      color: "info",
      icon: "👥",
    },
  ],
  Art: [
    {
      title: "Start a sketch",
      description: "Express yourself through drawing or sketching.",
      buttonText: "Begin sketching",
      color: "warning",
      icon: "✏️",
    },
    {
      title: "Visit a virtual museum",
      description: "Explore art online for inspiration.",
      buttonText: "Visit museum",
      color: "primary",
      icon: "🏛️",
    },
  ],
};

function MentalHealthTracker() {
  const [mood, setMood] = useState(null);
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [physicalActivity, setPhysicalActivity] = useState(5);
  const [socialInteraction, setSocialInteraction] = useState(5);
  const [activities, setActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    updateSuggestions();
  }, [activities]);

  const addActivity = (activity) => {
    if (activity && !activities.includes(activity)) {
      setActivities([...activities, activity]);
    }
    setCustomActivity("");
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const updateSuggestions = () => {
    let newSuggestions = [];
    activities.forEach((activity) => {
      if (allSuggestions[activity]) {
        newSuggestions = [...newSuggestions, ...allSuggestions[activity]];
      }
    });

    if (newSuggestions.length === 0) {
      newSuggestions = [
        {
          title: "Take a walk",
          description: "A 10-minute walk can boost your mood.",
          buttonText: "Go for a walk",
          color: "primary",
          icon: "🚶‍♂️",
        },
        {
          title: "Practice gratitude",
          description: "Write down three things you're grateful for.",
          buttonText: "Start writing",
          color: "info",
          icon: "✍️",
        },
        {
          title: "Stay hydrated",
          description:
            "Drink a glass of water to improve your mood and energy.",
          buttonText: "Drink water",
          color: "success",
          icon: "💧",
        },
        {
          title: "Get some sunlight",
          description:
            "Spend a few minutes in natural light to boost your mood.",
          buttonText: "Go outside",
          color: "warning",
          icon: "☀️",
        },
      ];
    }

    setSuggestions(newSuggestions);
  };

  const handleGetSuggestions = () => {
    setShowSuggestions(true);
    updateSuggestions();
  };

  return (
    <div className="mental-health-tracker ">
      <div className="container py-5 backgroundcolor ">
        <h1 className="text-center mb-5 text-white ">Mental Health Tracker</h1>
        <div className="card shadow-lg  ">
          <div className="card-body">
            <h2 className="card-title mb-4">How are you feeling today?</h2>
            <div className="d-flex justify-content-between mb-5">
              {Object.entries(moodEmojis).map(([moodType, emoji]) => (
                <button
                  key={moodType}
                  className={`btn ${
                    mood === moodType ? "btn-primary" : "btn-outline-primary"
                  } p-3`}
                  style={{ fontSize: "2rem" }}
                  onClick={() => setMood(moodType)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="row mb-4">
              {[
                {
                  label: "Stress Level",
                  value: stressLevel,
                  setValue: setStressLevel,
                  icon: "🧠",
                },
                {
                  label: "Sleep Quality",
                  value: sleepQuality,
                  setValue: setSleepQuality,
                  icon: "🛌",
                },
                {
                  label: "Physical Activity",
                  value: physicalActivity,
                  setValue: setPhysicalActivity,
                  icon: "💪",
                },
                {
                  label: "Social Interaction",
                  value: socialInteraction,
                  setValue: setSocialInteraction,
                  icon: "💬",
                },
              ].map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <label
                    htmlFor={item.label.toLowerCase().replace(" ", "-")}
                    className="form-label"
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.label}
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id={item.label.toLowerCase().replace(" ", "-")}
                    min="1"
                    max="10"
                    value={item.value}
                    onChange={(e) => item.setValue(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mb-3">Activities</h3>
            <div className="mb-3">
              {activityCategories.map((category) => (
                <button
                  key={category.name}
                  className={`btn btn-sm m-1 ${
                    activities.includes(category.name)
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => addActivity(category.name)}
                >
                  <span className="me-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            <div className="mb-3">
              {activities.map((activity, index) => (
                <span
                  key={index}
                  className="badge bg-primary me-2 mb-2 p-2"
                  style={{ fontSize: "1rem" }}
                >
                  <span className="me-2">
                    {activityCategories.find((cat) => cat.name === activity)
                      ?.icon || "⭐"}
                  </span>
                  {activity}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    onClick={() => removeActivity(index)}
                    style={{ fontSize: "0.5rem" }}
                  ></button>
                </span>
              ))}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add a custom activity"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addActivity(customActivity);
                  }
                }}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={() => addActivity(customActivity)}
              >
                <span className="me-2">➕</span>
                Add
              </button>
            </div>
            <button
              className="btn btn-primary btn-lg w-100 mt-4"
              onClick={handleGetSuggestions}
            >
              <span className="me-2">💡</span>
              Get Personalized Suggestions
            </button>
          </div>
        </div>
        {showSuggestions && (
          <div className="mt-5">
            <h2 className="mb-4 text-white">Personalized Suggestions</h2>
            <div className="row">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div
                    className={`card h-100 shadow-sm bg-${suggestion.color} bg-opacity-10`}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        <span className="me-2">{suggestion.icon}</span>
                        {suggestion.title}
                      </h5>
                      <p className="card-text flex-grow-1">
                        {suggestion.description}
                      </p>
                      <button className={`btn btn-${suggestion.color} mt-auto`}>
                        {suggestion.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <style jsx>{`
        .mental-health-tracker {
          min-height: 100vh;
          background: linear-gradient(
            -45deg,
            #ff9a9e,
            #fad0c4,
            #ffecd2,
            #fcb69f
          );
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hover-effect {
          transition: all 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn-primary {
          background-color: #4a90e2;
          border-color: #4a90e2;
        }
        .btn-primary:hover {
          background-color: #357abd;
          border-color: #357abd;
        }
      `}</style> */}
    </div>
  );
}

export default MentalHealthTracker;
