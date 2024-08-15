import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app/api/members.json");

export async function GET() {
  const data = await fs.readFile(dataFilePath, "utf8");
  const members = JSON.parse(data);
  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const newMember = await request.json();
  const data = await fs.readFile(dataFilePath, "utf8");
  const members = JSON.parse(data);

  // Validate required fields
  const requiredFields = ["name", "username", "email", "role", "status"];
  for (const field of requiredFields) {
    if (!newMember[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  newMember.id = members.length + 1;
  members.push(newMember);
  await fs.writeFile(dataFilePath, JSON.stringify(members, null, 2));
  return NextResponse.json(newMember, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedMember = await request.json();
  const data = await fs.readFile(dataFilePath, "utf8");
  let members = JSON.parse(data);

  // Validate required fields
  const requiredFields = ["id", "name", "username", "email", "role", "status"];
  for (const field of requiredFields) {
    if (!updatedMember[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  const index = members.findIndex(
    (member: any) => member.id === updatedMember.id
  );
  if (index === -1) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  members[index] = { ...members[index], ...updatedMember };
  await fs.writeFile(dataFilePath, JSON.stringify(members, null, 2));
  return NextResponse.json(updatedMember);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const data = await fs.readFile(dataFilePath, "utf8");
  let members = JSON.parse(data);
  const initialLength = members.length;
  members = members.filter((member: any) => member.id !== id);

  if (members.length === initialLength) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  await fs.writeFile(dataFilePath, JSON.stringify(members, null, 2));
  return NextResponse.json({ message: "Member deleted" });
}
