import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function RecipeCard({ recipeData }) {
  const { title, description, ingredients, instructions, image, author, date } =
    recipeData;
  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-col">
          <div className="flex flex-row gap-3">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={image}
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
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={date}></time>
              </p>
            </div>
            <Disclosure.Button>
              <ChevronDownIcon
                className={open ? "rotate-180 transform w-10" : "w-10"}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>HI</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export default RecipeCard;
