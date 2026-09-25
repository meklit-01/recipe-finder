function RecipeCard({
  recipe,
  isFavorite,
  onFavorite,
  onViewRecipe,
}) {
  return (
    <div className="recipe-card">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="recipe-info">
        <h2>{recipe.strMeal}</h2>

        <p>{recipe.strCategory}</p>

        <button
          className="favorite-button"
          onClick={() => onFavorite(recipe)}
        >
          {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
        </button>

        <button
          className="view-recipe-button"
          onClick={() => onViewRecipe(recipe)}
        >
          View Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeCard