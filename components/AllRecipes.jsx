"use client";

import React from "react";
import RecipeCard from "./RecipeCard";

const AllRecipes = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData()");
      try {
        var token = "";
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token") || "";
        }

        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${serverURL}api/allRecipe`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const jsonRes = await res.json();

        console.log(jsonRes.data);
        setData(jsonRes.data || "no data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((recipe) => {
        return (
          <li className="py-5">
            <RecipeCard recipeData={recipe} />
          </li>
        );
      })}
    </ul>
  );
};

export default AllRecipes;
