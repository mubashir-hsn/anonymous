import { transporter } from "@/lib/resend"; 
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    if (!email) throw new Error("Recipient email is not provided.");
    if (!verifyCode) throw new Error("Verification code is not provided.");

    // Render the React email template to HTML
    const emailHtml = await render(VerificationEmail({ username, otp: verifyCode }));

    // Send the email using Nodemailer
    await transporter.sendMail({
      from: `"Anonify" <${process.env.EMAIL}>`,
      to: email,
      subject: "Mystery Message Verification Code",
      html: emailHtml,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (error: any) {
    console.error("Error sending verification email:", error.message || error);
    return { success: false, message: "Failed to send verification email." };
  }
}
