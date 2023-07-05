"use client";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  if (window != null) {
    window.localStorage.removeItem("token");
    window.location.href = '/'
  }

  return <></>;
}
