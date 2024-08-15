import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "tmp/roles.json");

export async function GET() {
  const data = await fs.readFile(dataFilePath, "utf8");
  const roles = JSON.parse(data);
  return NextResponse.json(roles);
}
