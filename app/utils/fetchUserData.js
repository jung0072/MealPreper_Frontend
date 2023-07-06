export async function fetchUserData(token) {
  try {
    console.log("fetchUserData");
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}auth/userData`;

    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((parsedBody) => parsedBody.data)
      .catch((error) =>
        console.log("Error at fetch call in fetchUserData():", error)
      );
  } catch (error) {
    console.error("Error at fetchUserData():", error);
  }
}
