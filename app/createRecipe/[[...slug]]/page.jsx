"use client";
import React from "react";
import IngredientForm from "../../../components/IngredientForm";

function CreateRecipePage({ params }) {
  const id = params?.slug?.[0]; // Handle empty slugs
  const options = [
    { id: 1, name: "Red Pepper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ];

  function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log({ value });
  }

  const [ingredientSlots, setIngredientSlots] = React.useState([1, 2]);

  function addIngredientSlot() {
    console.log("addIngredientSlot");
    setIngredientSlots((slots) => {
      return [...slots, slots[slots.length - 1] + 1];
    });
  }

  function removeIngredientSlot(id) {
    console.log("removeIngredientSlot");
    setIngredientSlots((slots) => slots.filter((slot) => slot !== id));
  }

  async function GenerateRecipeWithLink(params) {
    const form = document.querySelector("form");
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    const copiedRecipe = value.copiedRecipe;
    var token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}api/generateRecipe`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ copiedRecipe }),
    });

    const jsonRes = await res.json();

    console.log(jsonRes.data);
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add A Recipe
          </h1>
        </div>
      </header>
      <form id="form" onSubmit={handleFormSubmit}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Please add your recipe below
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Link */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Link
                </label>

                <input
                  type="text"
                  name="link"
                  id="link"
                  className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="copiedRecipe"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Copied Recipe
                </label>
                <input
                  type="textfield"
                  name="copiedRecipe"
                  id="copiedRecipe"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button onClick={GenerateRecipeWithLink}>
                  Generate Recipe
                </button>
                <p id="generated result"></p>
              </div>

              {/* Title */}
              <TitleForm />

              {/* Ingredient */}
              <div className="sm:col-span-4">
                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                  Ingredient
                </h3>
                <div className="flex flex-col gap-2">
                  {ingredientSlots.map((id) => (
                    <IngredientForm
                      key={id}
                      id={id}
                      name={`ingredient${id}`}
                      remove={removeIngredientSlot}
                    />
                  ))}
                </div>
                <button onClick={addIngredientSlot}>Add</button>
              </div>

              {/* Type */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    autoComplete="type-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateRecipePage;

function TitleForm() {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="title"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Title
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="given-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
