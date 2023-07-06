"use client";

import React from "react";
import RecipeCard from "../../components/RecipeCard";
import { useContext } from "react";
import { UserContext } from "../layout";

const AllRecipesPage = () => {
  const { userData } = useContext(UserContext);
  var recipes = null;
  if (userData) {
    recipes = userData["recipes"];
    console.log(recipes);
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {recipes && Array.isArray(recipes) ? (
        recipes.map((recipe, i) => {
          return (
            <li key={i} className="py-5">
              <RecipeCard recipeData={recipe} />
            </li>
          );
        })
      ) : (
        <>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            No recipes found
          </h3>
        </>
      )}
    </ul>
  );
};

export default AllRecipesPage;
