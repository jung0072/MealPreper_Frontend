"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  var token = searchParams.get("token");

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  return (
    <main>
      <div>AuthPage</div>
    </main>
  );
}
