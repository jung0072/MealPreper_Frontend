export default function recipeBlockSerializer(recipeData) {
  const maxBlockIndex = Math.max(
    ...recipeData.instructions.map((instruction) => instruction.block)
  );

  const serializedRecipeBlocks = Array(maxBlockIndex + 1).fill({
    instruction: {},
    ingredient: [],
  });

  recipeData.instructions.forEach((instruction) => {
    serializedRecipeBlocks[instruction.block].instruction = instruction;
  });

  recipeData.ingredients.forEach((ingredient) => {
    ingredient.blocks.forEach((block) => {
      serializedRecipeBlocks[block].ingredient.push(ingredient);
    });
  });

  return serializedRecipeBlocks;
}
