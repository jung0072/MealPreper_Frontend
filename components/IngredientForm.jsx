import React from "react";
import {
  PhotoIcon,
  UserCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import ComboBox from "./ComboBox";

const options = [
  { id: 1, name: "Red Pepper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

function IngredientForm({
  ingredientData = {
    title: "title",
    description: "description",
    date: "2023-01-23T13:23Z",
  },
}) {
  return (
    <div className="sm:col-span-4">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Ingredient
      </label>
      <Disclosure>
        <div className="flex flex-col">
          <div className="flex flex-row gap-3">
            <img
              class="h-12 w-12 flex-none rounded-full bg-gray-50"
              src="https://upload.wikimedia.org/wikipedia/commons/8/87/Red-Pepper.jpg"
              alt=""
            />
            <ComboBox options={options} className="h-12 w-12" />
          
            <TrashIcon className="w-7" />
          </div>
          <Disclosure.Panel>HI</Disclosure.Panel>
        </div>
      </Disclosure>
    </div>
  );
}

export default IngredientForm;
