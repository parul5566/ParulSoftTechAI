import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@parulsofttechai.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ParulAdmin2026!";

    if (email === expectedEmail && password === expectedPassword) {
      return NextResponse.json({
        success: true,
        token: "pst_admin",
        email: expectedEmail,
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
