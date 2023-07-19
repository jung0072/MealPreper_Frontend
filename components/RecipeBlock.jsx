import React from "react";

export default function RecipeBlocks({ recipeData }) {
  console.log("recipeData", recipeData);

  const serializedRecipes = React.useRef([]);

  React.useEffect(() => {
    serializedRecipes.current = recipeBlockSerializer(recipeData);
  }, [recipeData]);

  if (!serializedRecipes.current) return null;

  return (
    <div className="flex flex-col gap-3" >
      {serializedRecipes.current.map((block, index) => {
        return (
          <div
            className="recipe-block grid grid-cols-12 border-2 rounded-md p-2 gap-2"
            key={index}
          >
            <img
              src={block.instructions.image}
              alt={""}
              className="col-start-1 col-end-4"
            />
            <p className="col-start-4 col-end-8">
              {block.instructions.instructionContent}
            </p>
            <div className="col-start-8 col-end-13 flex flex-col">
              {ingredientBlocks(block.ingredients)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ingredientBlocks(ingredients) {
  const blocks = ingredients.map((ingredient) => {
    return (
      <div className="flex justify-between" key={ingredient._id}>
        <img src={ingredient.image} alt="" />
        <span>{ingredient.ingredientName}</span>
        <span>{ingredient.amount}</span>
        <span>{ingredient.unit}</span>
      </div>
    );
  });
  return blocks;
}

function recipeBlockSerializer(recipeData) {
  const serializedRecipeBlocks = Array.from(
    { length: recipeData.instructions.length },
    () => ({
      instructions: { instructionContent: "", image: "" },
      ingredients: [],
    })
  );

  recipeData.instructions.forEach((instruction) => {
    serializedRecipeBlocks[instruction.block].instructions = instruction;
  });

  recipeData.ingredients.forEach((ingredient) => {
    ingredient.blocks.forEach((block) => {
      console.log(ingredient);
      serializedRecipeBlocks[block].ingredients.push(ingredient);
    });
  });

  return serializedRecipeBlocks;
}
