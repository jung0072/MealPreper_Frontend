"use client";

import React from "react";
import { UserContext } from "../../../../app/layout";

import Rating from "@mui/material/Rating";


function serializedRecipeInfo(recipe) {
    const recipeBlockArray = [];
    recipe
}

const RecipeCookingModePage = ({ params }) => {
  const id = params.id;
  const { userData } = React.useContext(UserContext);
  const [recipeData, setRecipeData] = React.useState(null);
  const [recipeBlockArray, setRecipeBlockArray] = React.useState([]);

  React.useEffect(() => {
    const recipes = userData?.recipes || null;
    if (recipes != null && id != null) {
      const recipeWithCurrentId = recipes.find((recipe) => recipe._id === id);
      console.log(recipeWithCurrentId);
      const serializedRecipeInfo = serializedRecipeInfo(recipeWithCurrentId);
      setRecipeData(recipeWithCurrentId);
    }
  }, [userData]);

  if (recipeData == null) return <div>Loading...</div>;

  return (
    <>
      {/* Title */}
      <div>{recipeData.title}</div>
      {/* Serving and Calories */}
      <div>
        <div>Serving: {recipeData.servings}</div>
        <div>Calories: {recipeData.calories}</div>
      </div>
      {/* Cooking Blocks */}
      {recipeBlockArray.map((recipeBlock, index) => {
        return (
          <div className="recipeBlock flex">
            <span className="recipeBlock__order">{index}</span>
            <img
              src={recipeBlock.image}
              alt=""
              className="recipeBlock__image"
            />
            <p className="">{recipeBlock.instruction}</p>
            <div className="flex flex-col">
              <div className="recipeBlock__ingredient flex">
                <img
                  src={recipeBlock.ingredient.image}
                  alt=""
                  className="ingredient__image"
                />
                <span className="ingredient__info--name">
                  {recipeBlock.ingredient.ingredientName}
                </span>
                <span className="ingredient__info--amount">
                  {recipeBlock.ingredient.amount}
                </span>
                <span className="ingredient__info--unit">
                  {recipeBlock.ingredient.unit}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecipeCookingModePage;