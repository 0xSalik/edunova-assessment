import { NextResponse } from "next/server";
import pb from "../../utils/db";

export async function GET() {
  const resultList = await pb.collection("ed_members").getFullList();
  const members = resultList.map((item) => item.member);
  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const newMember = await request.json();
  const data = await pb.collection("ed_members").getFullList();
  const requiredFields = ["name", "username", "email", "role", "status"];

  for (const field of requiredFields) {
    if (!newMember[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  const newId = data.length + 1;
  const createdMember = {
    member: { ...newMember, id: newId },
  };

  await pb.collection("ed_members").create(createdMember);
  return NextResponse.json(createdMember.member, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedMember = await request.json();
  const requiredFields = ["id", "name", "username", "email", "role", "status"];

  for (const field of requiredFields) {
    if (!updatedMember[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  const resultList = await pb.collection("ed_members").getFullList();
  const memberToUpdate = resultList.find(
    (item) => item.member.id === updatedMember.id
  );

  if (!memberToUpdate) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const updatedData = { ...memberToUpdate, member: updatedMember };
  const upd = await pb
    .collection("ed_members")
    .update(memberToUpdate.id, updatedData);

  return NextResponse.json(upd.member);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const resultList = await pb.collection("ed_members").getFullList();
  const memberToDelete = resultList.find((item) => item.member.id === id);

  if (!memberToDelete) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  await pb.collection("ed_members").delete(memberToDelete.id);
  return NextResponse.json({ message: "Member deleted" });
}
