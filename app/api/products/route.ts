import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  return NextResponse.json(request.method);
};
