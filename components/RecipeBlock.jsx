import React from "react";

export default function RecipeBlocks({ recipeData }) {
  console.log("recipeData", recipeData);

  const serializedRecipes = React.useRef([]);

  React.useEffect(() => {
    console.log("before serialized recipes", serializedRecipes);
    serializedRecipes.current = recipeBlockSerializer(recipeData);
    console.log("after serialized recipes", serializedRecipes);
  }, [recipeData]);

  if (!serializedRecipes.current) return null;

  return (
    <div className="flex flex-col gap-3">
      {serializedRecipes.current.map((block, index) => {
        return (
          <div className="recipe-block grid grid-cols-12" key={index}>
            <img
              src={block.instruction.image}
              alt={""}
              className="col-span-3"
            />
            <p className="col-span-5">{block.instruction.instructionContent}</p>
            <div className="col-span-5 flex flex-col">
              <div className="flex">
                <img src="" alt="" />
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function recipeBlockSerializer(recipeData) {
  console.log(recipeData.instructions.length);
  
  const serializedRecipeBlocks = Array.from(
    { length: recipeData.instructions.length },
    () => ({
      instruction: { instructionContent: "", image: "" },
      ingredient: [""],
    })
  );
  console.log("serializedRecipeBlocks before", serializedRecipeBlocks);

  recipeData.instructions.forEach((instruction) => {
    console.log("instruction block", instruction.block);
    serializedRecipeBlocks[instruction.block].instruction = instruction;
  });

  console.log(
    "serializedRecipeBlocks after instruction",
    serializedRecipeBlocks
  );

  recipeData.ingredients.forEach((ingredient) => {
    ingredient.blocks.forEach((block) => {
      console.log("ingredient block", block);
      serializedRecipeBlocks[block].ingredient.push(ingredient);
    });
  });
  console.log(
    "serializedRecipeBlocks after ingredient",
    serializedRecipeBlocks
  );

  return serializedRecipeBlocks;
}
