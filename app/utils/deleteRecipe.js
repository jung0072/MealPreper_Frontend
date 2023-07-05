export async function deleteRecipe({ token, recipeId }) {
  try {
    console.log("deleteRecipe");

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}api/recipe/${recipeId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        
        return res.json();
      })
      .catch((err) => {
        console.log("err", err);
      });
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}
