/**
 * Hello Edunova team, I  initially used  json files to populate the app from the api routes.
 * but turns out vercel doesn't allow writing to files over serverless functions so I decided
 * to go with PocketBase, it's a pretty good database built in Golang. It uses SQLite in the backend.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Hello Edunova team! This is an empty route meant for health checks.",
    },
    { status: 201 }
  );
}
