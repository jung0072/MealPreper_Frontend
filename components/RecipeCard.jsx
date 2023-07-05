import React from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import photo from "../public/assets/images/sample-recipe-picture.jpeg";
import { UserContext } from "../app/layout";
import { deleteRecipe } from "../app/utils/deleteRecipe";

function RecipeCard({ recipeData }) {
  const { _id, title, description, image, rate, type } = recipeData;
  const { token, setUserData } = React.useContext(UserContext);

  function deleteButtonHandler() {
    setUserData((prev) => {
      return prev.filter((recipe) => recipe._id !== _id);
    });
    deleteRecipe({ token: token, recipeId: _id });
  }

  return (
    <div className="flex flex-row w-full justify-between ">
      <Link
        href={`/recipe/${_id}`}
        className="flex flex-row gap-3 hover:bg-slate-400"
      >
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={photo}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-end">
          <Rating name="rating" value={rate} readOnly={true} />
          <div className="mt-1 truncate text-xs leading-5 text-gray-500">
            {type}
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:cursor-pointer hover:text-red-500"
            onClick={deleteButtonHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
