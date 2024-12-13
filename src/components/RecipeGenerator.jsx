import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sanitizeHtml from 'sanitize-html';
import "./css/recipeGenerator.css"
import  recipeGenbackcover from "./images/recipeGenbackcover1.jpg"

const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  return (
    <div className="card h-100  blur1" style={{ maxHeight: '700px', overflowY: 'auto' }}>
      <div className="card-bodyy d-flex flex-column p-5">
        <h2 className="card-title text-success mb-4">Recipe Generator</h2>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <input
            type="text"
            className="form-control"
            id="ingredients"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mealType" className="form-label">Meal Type</label>
          <input
            type="text"
            className="form-control"
            id="mealType"
            placeholder="Enter meal type"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cuisine" className="form-label">Cuisine Preference</label>
          <input
            type="text"
            className="form-control"
            id="cuisine"
            placeholder="e.g., Italian, Mexican"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
          <input
            type="text"
            className="form-control"
            id="cookingTime"
            placeholder="e.g. 30 minutes"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="complexity" className="form-label">Complexity</label>
          <input
            type="text"
            className="form-control"
            id="complexity"
            placeholder="e.g. beginner, advanced, intermediate"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          />
        </div>
        <button
          className="btn btn-success w-100 mt-auto"
          onClick={handleSubmit}
        >
          Generate Recipe
        </button>
      </div>
    </div>
  );
};

const Recipes = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");

  useEffect(() => {
    if (recipeData) {
      // Simulating API call
      setTimeout(() => {
        setRecipeText("Your delicious recipe will appear here!");
      }, 1000);
    }
  }, [recipeData]);

  const sanitizedText = sanitizeHtml(recipeText, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'strong', 'em'],
    allowedAttributes: {}
  });

  // const onSubmit = (data) => {
  //   setRecipeText('');
  //   setRecipeData(data);
  // };
  const onSubmit = async (data) => {
    setRecipeText('Loading...');
    setRecipeData(data);

    const queryString = new URLSearchParams(data).toString();
    const response = await fetch(`http://localhost:3001/recipestream?${queryString}`, {
      method: 'GET',
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = '';
    
    reader.read().then(function processText({ done, value }) {
      if (done) {
        setRecipeText(result);
        return;
      }
      result += decoder.decode(value, { stream: true });
      setRecipeText(result); // Continuously update with streamed content
      return reader.read().then(processText);
    });
  };

  return (
    <div className=" d-flex align-items-center justify-content-center p-4 backgroundimage" style={{
       // Prevents scroll
      height: '100vh', // Full viewport height
      backgroundImage: `url(${recipeGenbackcover})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover', // Optional: covers the container
        backgroundPosition: 'center', // Optional: centers the image
    }}>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <RecipeCard onSubmit={onSubmit} />
          </div>
          <div className="col-lg-5 ">
            <div className="card h-100 bg-darkk "style={{ maxHeight: '700px', overflowY: 'auto' }}>
              <div className="card-body d-flex flex-column m-4 text-white">
                <h2 className="card-title text-success mb-4 ">Your Recipe</h2>
                <div className="recipe-content flex-grow-1 text-white">
                  <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;