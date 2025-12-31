import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Add contact to SendGrid list
    const data = {
      contacts: [{
        email: email,
        first_name: name || "",
        custom_fields: {
          // Add any custom fields you want to track
          source: "waitlist"
        }
      }]
    };

    await sgMail.request({
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: data
    });

    // Optional: Send welcome email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'hello@waco3.io',
      subject: 'Welcome to Waco3.io Waitlist!',
      text: `Hi ${name || 'there'},\n\nThank you for joining the Waco3.io waitlist! You're now on the list for exclusive early access with a special discount.\n\nWe'll notify you as soon as we launch.\n\nBest,\nThe Waco3.io Team`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0900ff;">Welcome to Waco3.io!</h1>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for joining the <strong>Waco3.io waitlist</strong>! You're now on the list for exclusive early access with a special discount.</p>
          <p>We'll notify you as soon as we launch.</p>
          <p style="margin-top: 32px;">Best,<br/>The Waco3.io Team</p>
        </div>
      `
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
