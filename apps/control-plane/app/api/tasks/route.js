import { NextResponse } from "next/server";
import { Orchestrator } from "../../orchestrator.js";

const orchestrator = new Orchestrator();

export async function POST(req) {
  const task = await req.json();
  orchestrator.transition("CLASSIFIED");

  return NextResponse.json({
    status: "OK",
    task,
    currentState: orchestrator.state
  });
}
