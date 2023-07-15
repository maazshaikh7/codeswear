import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([123456, 908765, 400072]);
}
