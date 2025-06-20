import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { Types } from "mongoose";

// 🔍 Get a single notice by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const notice = await Notice.findById(id);
  if (!notice) {
    return NextResponse.json({ error: "Notice not found" }, { status: 404 });
  }

  return NextResponse.json(notice);
}

// ✏️ Update a notice by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const updated = await Notice.findByIdAndUpdate(
    id,
    { title: body.title, description: body.description },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Notice not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// ❌ Delete a notice by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const deleted = await Notice.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Notice not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Notice deleted successfully" });
}



// import { NextRequest, NextResponse,  } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Notice from "@/models/Notice";
// import { Types } from "mongoose";

// // 🔍 Get a single notice by ID
// export async function GET(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   await dbConnect();
//   const { id } = context.params;

//   if (!Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const notice = await Notice.findById(id);
//   if (!notice) {
//     return NextResponse.json({ error: "Notice not found" }, { status: 404 });
//   }

//   return NextResponse.json(notice);
// }

// // ✏️ Update a notice by ID
// export async function PUT(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   await dbConnect();
//   const { id } = context.params;
//   const body = await req.json();

//   if (!Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const updated = await Notice.findByIdAndUpdate(
//     id,
//     { title: body.title, description: body.description },
//     { new: true }
//   );

//   if (!updated) {
//     return NextResponse.json({ error: "Notice not found" }, { status: 404 });
//   }

//   return NextResponse.json(updated);
// }

// // ❌ Delete a notice by ID
// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   await dbConnect();
//   const { id } = context.params;

//   if (!Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const deleted = await Notice.findByIdAndDelete(id);

//   if (!deleted) {
//     return NextResponse.json({ error: "Notice not found" }, { status: 404 });
//   }

//   return NextResponse.json({ message: "Notice deleted successfully" });
// }
