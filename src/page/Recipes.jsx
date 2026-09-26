import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard"
import RecipeDetails from "./RecipeDetails"
import "../App.css"
function Recipes() {

  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("favorites")

  return savedFavorites
    ? JSON.parse(savedFavorites)
    : []
})

const [selectedRecipe, setSelectedRecipe] = useState(null)

const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
  // Fetch all recipes
useEffect(() => {
  async function fetchRecipes() {
    try {
      setLoading(true)

      let url =
        "https://www.themealdb.com/api/json/v1/1/search.php?s="

      if (selectedCategory !== "All") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedCategory}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }

      const data = await response.json()

      setRecipes(data.meals || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  fetchRecipes()
}, [selectedCategory])

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
  return recipe.strMeal
    .toLowerCase()
    .includes(search.toLowerCase())
})

  if (loading) {
    return <p>Loading recipes...</p>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  function toggleFavorite(recipe) {
  const alreadyFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal
  )

  if (alreadyFavorite) {
    setFavorites(
      favorites.filter(
        (favorite) => favorite.idMeal !== recipe.idMeal
      )
    )
  } else {
    setFavorites([...favorites, recipe])
  }
}

  return (
    <div className="app">
     <div className="logo">
      <img src="public/image/logo.png" alt="logo" />
     </div>
      <div className="search-box">
      <input
      type="text"
      placeholder="Search recipes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
  />
    </div>

      <div className="category-bar">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        <div className="category-bar">
        <button
          className={selectedCategory === "Chicken" ? "active" : ""}
          onClick={() => setSelectedCategory("Chicken")}
        >
          Chicken
        </button>

        <button
          className={selectedCategory === "Beef" ? "active" : ""}
          onClick={() => setSelectedCategory("Beef")}
        >
           Beef
        </button>
        <button
          className={selectedCategory === "rice" ? "active" : ""}
          onClick={() => setSelectedCategory("rice")}
        >
          Rice
        </button>

        <button
          className={selectedCategory === " Goat" ? "active" : ""}
          onClick={() => setSelectedCategory(" Goat")}
        >
          Goat
        </button>
        <button
          className={selectedCategory === "pasta" ? "active" : ""}
          onClick={() => setSelectedCategory("pasta")}
        >
          Pasta
        </button>
        <button
          className={selectedCategory === "Pork" ? "active" : ""}
          onClick={() => setSelectedCategory("Pork")}
        >
          Pork
        </button>
        <button
          className={selectedCategory === " Lamb" ? "active" : ""}
          onClick={() => setSelectedCategory(" Lamb")}
        >
          Lamb
        </button>
        <button
          className={selectedCategory === "Seafood" ? "active" : ""}
          onClick={() => setSelectedCategory("Seafood")}
        >
          Seafood
        </button>
        <button
          className={selectedCategory === "Starter" ? "active" : ""}
          onClick={() => setSelectedCategory("Starter")}
        >
          Starter
        </button>
        <button
          className={selectedCategory === "vegetarian" ? "active" : ""}
          onClick={() => setSelectedCategory("vegetarian")}
        >
          vegetarian
        </button>
        <button
          className={selectedCategory === "vegan" ? "active" : ""}
          onClick={() => setSelectedCategory("vegan")}
        >
          Vegan
        </button>
        <button
          className={selectedCategory === "breakfast" ? "active" : ""}
          onClick={() => setSelectedCategory("breakfast")}
        >
         Breakfast
        </button> 
      </div>

        {categories.map((category) => (
          <button
            key={category.idCategory}
            
            onClick={() =>
              setSelectedCategory(category.strCategory)
            }
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={favorites.some(
          (favorite) => favorite.idMeal === recipe.idMeal
        )}
      onFavorite={toggleFavorite}
      onViewRecipe={setSelectedRecipe}
/>
        ))}
      </div>
      {/* Favorites */}
    <h2 className="favorites-title">My Favorites</h2>

    <div className="recipe-grid">
  {favorites.filter ((recipe)=> recipe && recipe.idMeal).map((recipe) => (
    <RecipeCard
      key={recipe.idMeal}
      recipe={recipe}
      isFavorite={true}
      onFavorite={toggleFavorite}
      onViewRecipe={setSelectedRecipe}
    />
  ))}
    </div>
    {selectedRecipe && (
      <div className="recipe-modal">
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      </div>
    )}

    </div>
  )
}

export default Recipes