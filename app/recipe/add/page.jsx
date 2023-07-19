"use client";
import React, { useCallback } from "react";
import IngredientForm from "../../../components/IngredientForm";
import InstructionForm from "../../../components/InstructionForm";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import { UserContext } from "../../../app/layout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RecipeBlocks from "../../../components/RecipeBlock";

function CreateRecipePage({ params }) {
  const router = useRouter();

  const id = params.id;
  const { userData, setUserData } = useContext(UserContext);
  const [recipeData, setRecipeData] = React.useState(null);

  React.useEffect(() => {
    const recipes = userData?.recipes || null;
    if (recipes != null && id != null) {
      const recipeWithCurrentId = recipes.find((recipe) => recipe._id === id);
      setRecipeData(recipeWithCurrentId);
    }
  }, [userData]);

  const [title, setTitle] = React.useState("");
  const [servings, setServings] = React.useState(1);
  const [rateValue, setRateValue] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [GPTAnswer, setGPTAnswer] = React.useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log("Form Entries:", value);
    const submitData = {
      title: value.title,
      description: value.description,
      ingredients: [],
      instructions: [],
      servings: value.servings,
      rating: value.rating,
      link: value.link,
      copiedRecipe: copiedRecipe,
      type: value.type,
    };

    
    for (let i = 0; value[`instruction-${i}`] != null; i++) {
      const instruction = {
        instructionContent: value[`instruction-${i}`],
        block: i,
      };
      submitData.instructions.push(instruction);
    }

    for (let i = 0; value[`ingredient-${i}-name`] != null; i++) {
      const blocks = [];
      console.log("submitData instruction", submitData.instructions);
      submitData.instructions.map((instruction) => {
        console.log(instruction.instructionContent);
        if (
          instruction.instructionContent.includes(value[`ingredient-${i}-name`])
        ) {
          blocks.push(instruction.block);
        }
      });

      const ingredient = {
        ingredientName: value[`ingredient-${i}-name`],
        amount: value[`ingredient-${i}-amount`],
        unit: value[`ingredient-${i}-unit`],
        process: value[`ingredient-${i}-process`],
        blocks: blocks,
      };

      submitData.ingredients.push(ingredient);
    }

    const submitDataInJson = JSON.stringify(submitData);
    console.log("submit formData:", { submitDataInJson });

    const token = localStorage.getItem("token") || null;
    if (!token) {
      console.log("No token found");
      return;
    }
    // If id exists, then we are editing an existing recipe
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    if (id) {
      await fetch(`${serverURL}api/recipe/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Form Submitted with a result:", { json });
          setUserData((prev) => {
            const newUserData = prev;
            const index = newUserData.recipes.findIndex(
              (recipe) => recipe._id === id
            );
            newUserData.recipes[index] = json.data;
            return newUserData;
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      // If id does not exist, then we are creating a new recipe
      await fetch(`${serverURL}api/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Form Submitted with a result:", { json });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  // Change states according to the fetched recipe data
  React.useEffect(() => {
    if (recipeData != null) {
      console.log("recipeData", recipeData);

      setTitle(recipeData?.title);
      setDescription(recipeData?.description);
      setInstructionSlots(recipeData?.instructions);
      setIngredientSlots(recipeData?.ingredients);
      setServings(recipeData?.servings);
      setRateValue(recipeData?.rating || 0);
    }
  }, [recipeData]);

  const [ingredientSlots, setIngredientSlots] = React.useState(() => [
    { ingredientName: "", amount: "", unit: "" },
  ]);

  const addSlotHandler = useCallback((slotType) => {
    if (slotType === "ingredient") {
      addIngredientSlot();
    } else if (slotType === "instruction") {
      addInstructionSlot();
    }
  }, []);

  const addIngredientSlot = useCallback(() => {
    console.log("addIngredientSlot");
    setIngredientSlots((prev) => [
      ...prev,
      { ingredient: "", amount: "", unit: "" },
    ]);
  }, [ingredientSlots]);

  function removeIngredientSlot(id) {
    console.log("removeIngredientSlot");
    // setIngredientSlots((slots) => slots.filter((slot) => slot !== id));
  }

  const [instructionSlots, setInstructionSlots] = React.useState(() => [""]);

  function addInstructionSlot() {
    setInstructionSlots((prev) => [...prev, ""]);
    console.log("addInstructionSlot");
  }

  function removeInstructionSlot(id) {
    setInstructionSlots((slots) => slots.filter((slot) => slot !== id));
    console.log("removeInstructionSlot");
  }

  const [copiedRecipe, setCopiedRecipe] = React.useState("");

  async function GenerateRecipe() {
    console.log("GenerateRecipe");
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

    console.log("res", res);
    // Convert response's body json to JS object
    const jsonRes = await res.json();
    console.log("jsonRes", jsonRes);
    console.log("content", jsonRes.data.content);

    var result = null;
    try {
      result = JSON.parse(jsonRes.data.content);
    } catch (error) {
      console.log("Content from GPT is not a valid JSON");
      setGPTAnswer(jsonRes.data.content);
    }
    // Convert content format from text to json

    setRecipeData(result);
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
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Link */}
              <div className="sm:col-span-6">
                {/* <label
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
                </label> */}
                <span
                  role="textbox"
                  contentEditable="true"
                  id="copiedRecipe"
                  name="ddd"
                  value={copiedRecipe}
                  onInput={(e) => {
                    setCopiedRecipe(e.target.innerText);
                  }}
                  className="resizingTextArea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p id="generated result">{GPTAnswer}</p>
                <button
                  type="button"
                  onClick={GenerateRecipe}
                  className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Generate Recipe
                </button>
              </div>

              <Link
                href={`/recipe/cookingMode/${id}`}
                className="sm:col-span-6 mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Cooking Mode
              </Link>

              {/* Title */}
              <TitleForm title={title} />

              {/* Recipe Block */}
              <div className="sm:col-span-6">
                {/* {recipeData && <RecipeBlocks recipeData={recipeData} />} */}
              </div>

              {/* Description */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Ingredient */}
              <div className="sm:col-span-4">
                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                  Ingredient
                </h3>
                <div className="flex flex-col gap-2">
                  {ingredientSlots?.map((slot, index) => (
                    <IngredientForm
                      key={index}
                      id={index}
                      remove={removeIngredientSlot}
                      ingredientData={slot}
                      setIngredientSlots={setIngredientSlots}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addSlotHandler("ingredient")}
                >
                  Add
                </button>
              </div>

              {/* Instructions */}
              <div className="sm:col-span-4">
                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                  Instructions
                </h3>
                <div className="flex flex-col gap-2">
                  {instructionSlots?.map((slot, index) => (
                    <InstructionForm
                      key={index}
                      id={index}
                      remove={removeInstructionSlot}
                      instructionData={slot}
                      setInstructionSlots={setInstructionSlots}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addSlotHandler("instruction")}
                >
                  Add
                </button>
              </div>

              {/* Servings */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="servings"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Servings
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="servings"
                    id="servings"
                    value={servings}
                    onChange={(event) => setServings(event.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <Rating
                    name="rating"
                    value={rateValue}
                    onChange={(event, newValue) => {
                      setRateValue(newValue);
                    }}
                  />
                </div>
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
                    <option value="MEAL_PREP_LUNCH">Meal Prep Lunch</option>
                    <option value="MEAL_PREP_DINNER">Meal Prep Dinner</option>
                    <option value="MEAL">Meal</option>
                    <option value="SNACK">Snack</option>
                    <option value="DESSERT">Dessert</option>
                    <option value="DRINK">Drink</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => router.back()}
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

function TitleForm({ title, setTitle }) {
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="given-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
