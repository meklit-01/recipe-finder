function RecipeDetails({ recipe, onClose }) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      })
    }
  }

  return (
    <div className="recipe-details">
      <button
        className="close-button"
        onClick={onClose}
      >
        ✕
      </button>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <h2>{recipe.strMeal}</h2>

      <p className="details-category">
        {recipe.strCategory}
      </p>

      <h3>Ingredients</h3>

      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.measure} {item.name}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>

      <p className="instructions">
        {recipe.strInstructions}
      </p>
    </div>
  )
}

export default RecipeDetails