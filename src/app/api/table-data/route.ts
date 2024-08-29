import { NextResponse } from "next/server";
import { rawData } from "@/site-data/raw-data";

export async function GET() {
  return NextResponse.json(rawData);
}