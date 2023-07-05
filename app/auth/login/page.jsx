"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const token = searchParams.get("token");
  console.log("Token from param", token);

  React.useEffect(() => {
    if (window != null && token != "" && token != null) {
      window.localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
      setErrorMessage("Invalid token");
    }
  }, []);

  return <span>{errorMessage}</span>;
}
