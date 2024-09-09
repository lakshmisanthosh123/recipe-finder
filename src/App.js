import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query: query,
          number: 10,
          apiKey: '7a28911433e045e19500d0a1d74bc941', // Replace with your Spoonacular API key
        },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = (query) => {
    setQuery(query);
    fetchRecipes(query);
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
