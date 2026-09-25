import { useEffect, useState } from "react"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"
import "./App.css"
import Footer from "./components/Footer"
import Home from "./page/Home"

function App() {
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
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
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
      <h1>Recipe </h1>

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
          className={selectedCategory === "Dessert" ? "active" : ""}
          onClick={() => setSelectedCategory("Dessert")}
        >
          Dessert
        </button>

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
        className={selectedCategory === "Side" ? "active" : ""}
        onClick={() => setSelectedCategory("Side")}
        >
          Side
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
  {favorites.map((recipe) => (
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

   <Footer/>
    </div>
  )
}

export default App