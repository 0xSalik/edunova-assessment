/**
 * Hello Edunova team, I used simple json files to populate the app from the api routes.
 * I initially contemplated using a document database but this being an assessment app,
 * I decided against it since I'd need to introduce models and set up a remote connection
 * over the vercel edge network causing the app to slow down considerably.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Hello Edunova team! This is an empty route. Please read the top comment in the /api/route.ts file to understand why i went with plain json files.",
    },
    { status: 201 }
  );
}
