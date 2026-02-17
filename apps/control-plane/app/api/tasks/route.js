import { NextResponse } from "next/server";

export async function POST(req) {
  const task = await req.json();

  return NextResponse.json({
    status: "RECEIVED",
    taskId: crypto.randomUUID()
  });
}
