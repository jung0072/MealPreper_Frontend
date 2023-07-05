'use client'
import { NextResponse } from "next/server";

export default function middleware(request) {
  console.log("Hit a middleware:", request.nextUrl.pathname);

  // if ((request.nextUrl.pathname == "")) {
  //   console.log("");
  //   return NextResponse.redirect("/");
  // }
}

// Middle ware runs on REQUESTS not on rendering pages.
// Therefore it can't be used to page specific tasks.