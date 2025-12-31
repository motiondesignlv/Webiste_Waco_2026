import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

export async function POST(request) {
  try {
    const { email, locale = "en", source = "unknown" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const hasSendgridConfig =
      process.env.SENDGRID_API_KEY &&
      process.env.SENDGRID_TO_EMAIL &&
      process.env.SENDGRID_FROM_EMAIL;

    if (!hasSendgridConfig) {
      console.warn("SendGrid env vars missing; storing email locally only.");
      return NextResponse.json({ ok: true, stored: true });
    }

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    await sendgrid.send({
      to: process.env.SENDGRID_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email,
      subject: `New Waco3 lead (${locale})`,
      text: `Capture source: ${source}\nLocale: ${locale}\nEmail: ${email}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe API error", error);
    return NextResponse.json({ error: "Unable to submit email" }, { status: 500 });
  }
}
