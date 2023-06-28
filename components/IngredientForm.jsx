import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import ComboBox from "./ComboBox";

const options = [
  { id: 1, name: "Red Pepper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

function IngredientForm({id = null}) {

  return (
    <div className="sm:col-span-4">
      <h3 className="block text-sm font-medium leading-6 text-gray-900">
        Ingredient
      </h3>
      <div className="flex flex-row gap-3">
        <img
          class="h-12 w-12 flex-none rounded-full bg-gray-50"
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/Red-Pepper.jpg"
          alt=""
        />
        <ComboBox id={id} options={options} className="h-12 w-12" />

        <TrashIcon className="w-7" />
      </div>
    </div>
  );
}

export default IngredientForm;
