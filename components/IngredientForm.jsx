import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

function IngredientForm({
  id = null,
  ingredientData = null,
  remove,
  setIngredientSlots,
}) {
  return (
    <div className="flex flex-row gap-3">
      {/* <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://upload.wikimedia.org/wikipedia/commons/8/87/Red-Pepper.jpg"
        alt=""
      /> */}
      <input
        type="text"
        name={`ingredient-${id}-name`}
        id={id}
        value={ingredientData?.ingredientName || ""}
        onChange={(e) => {
          setIngredientSlots((prev) => {
            const result = prev.map((item, index) => {
              if (index === id) {
                item.ingredient = e.target.value;
              }
              return item;
            });
            return result;
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="number"
        name={`ingredient-${id}-amount`}
        id={id}
        value={ingredientData?.amount || ""}
        onChange={(e) => {
          setIngredientSlots((prev) => {
            const result = prev.map((item, index) => {
              if (index === id) {
                item.amount = [e.target.value];
              }
              return item;
            });
            return result;
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="text"
        name={`ingredient-${id}-unit`}
        id={id}
        value={ingredientData?.unit || ""}
        onChange={(e) => {
          setIngredientSlots((prev) => {
            const result = prev.map((item, index) => {
              if (index === id) {
                item.unit = e.target.value;
              }
              return item;
            });
            return result;
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="text"
        name={`ingredient-${id}-process`}
        id={id}
        value={ingredientData?.process || ""}
        onChange={(e) => {
          setIngredientSlots((prev) => {
            const result = prev.map((item, index) => {
              if (index === id) {
                item.process = e.target.value;
              }
              return item;
            });
            return result;
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <TrashIcon className="w-7" onClick={() => remove(id)} />
    </div>
  );
}

export default IngredientForm;
