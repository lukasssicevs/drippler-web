import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "drippler-web",
    version: "1.0.0",
    features: {
      emailVerification: true,
      passwordReset: true,
      extensionIntegration: true,
    },
  });
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Health check endpoint. Use GET method.",
    },
    { status: 405 }
  );
}
