import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { z } from "zod";

const testEmailSchema = z.object({
  email: z.string().email(),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const body = await req.json();
    const { email } = testEmailSchema.parse(body);

    // In a real application, you would send an actual email here
    // For now, we'll just simulate the email sending
    console.log(`Test email would be sent to: ${email}`);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(handler);
