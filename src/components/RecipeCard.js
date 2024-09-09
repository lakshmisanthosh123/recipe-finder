import React, { useState } from 'react';
import axios from 'axios';

function RecipeCard({ recipe }) {
  const [details, setDetails] = useState(null);

  const fetchDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: 'YOUR_API_KEY', // Replace with your Spoonacular API key
        },
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className="recipe-card" onClick={() => fetchDetails(recipe.id)}>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.summary}</p>
      {details && (
        <div className="recipe-details">
          <h3>Ingredients:</h3>
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{details.instructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
