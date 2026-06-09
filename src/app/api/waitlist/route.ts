import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { email, persona, useCase } = body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate persona
    if (!persona) {
      return NextResponse.json(
        { error: "Please select a persona" },
        { status: 400 }
      );
    }

    // Check for existing email
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "already_exists", message: "Looks like you're already on the waitlist." },
        { status: 409 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email: email.toLowerCase(),
        persona,
        use_case: useCase || null,
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not set");
      } else {
        const emailResponse = await resend.emails.send({
          from: "Tactly <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to the Tactly Waitlist",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f0f0f;">
              <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; color: #ffffff;">You're on the waitlist</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #a1a1a1; margin-bottom: 24px;">
                Thanks for joining the Tactly waitlist. We'll let you know as soon as we're ready to launch.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #a1a1a1; margin-bottom: 24px;">
                In the meantime, we're working hard to build the best communication intelligence tool for the internet.
              </p>
              <p style="font-size: 14px; color: #666666;">
                – The Tactly team
              </p>
            </div>
          `,
        });
        console.log("Email sent successfully:", emailResponse);
      }
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Don't fail the request if email fails - user is still on the waitlist
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined the waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
