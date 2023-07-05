export async function fetchUserData(token) {
  try {
    console.log("fetchUserData");
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}auth/userData`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("UserData res", res.body);
        
        return res.json();
      })
      .catch((err) => {
        console.log("err", err);
        return null;
      });

    console.log("UserData res", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}