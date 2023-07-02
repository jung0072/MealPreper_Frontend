import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import ComboBox from "./ComboBox";

const recipeOptions = [
  { id: 1, name: "Red Pepper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const unitOptions = [
  { id: 1, name: "grams" },
  { id: 2, name: "ounces" },
  { id: 3, name: "pounds" },
  { id: 4, name: "kilograms" },
  { id: 5, name: "milliliters" },
  { id: 6, name: "liters" },
  { id: 7, name: "teaspoons" },
  { id: 8, name: "tablespoons" },
  { id: 9, name: "cups" },
  { id: 10, name: "pints" },
  { id: 11, name: "quarts" },
  { id: 12, name: "gallons" },
];

function IngredientForm({ id = null, name, remove, ingredientData }) {
  return (
    <div className="flex flex-row gap-3">
      <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://upload.wikimedia.org/wikipedia/commons/8/87/Red-Pepper.jpg"
        alt=""
      />
      <input
        type="text"
        name={`ingredient-${id}-name`}
        id={id}
        defaultValue={ingredientData?.ingredient}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="number"
        name={`ingredient-${id}-amount`}
        id={id}
        defaultValue={ingredientData?.amount}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="text"
        name={`ingredient-${id}-unit`}
        id={id}
        defaultValue={ingredientData?.unit}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <TrashIcon className="w-7" onClick={() => remove(id)} />
    </div>
  );
}

export default IngredientForm;
