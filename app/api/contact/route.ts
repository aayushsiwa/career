import { NextRequest, NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Missing name" },
                { status: 400 }
            );
        }

        if (!email) {
            return NextResponse.json(
                { error: "Missing email" },
                { status: 400 }
            );
        }

        if (!message) {
            return NextResponse.json(
                { error: "Missing message" },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: process.env.NEXT_PUBLIC_CONTACT_EMAIL as string,
            subject: "Message from HustleHop",
            react: ContactEmailTemplate({ name, email, message }),
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
