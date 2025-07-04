import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendWelcomeEmail = async (email: string, firstName: string) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error("❌ Missing EmailJS environment variables.");
    return;
  }

  try {
    const templateParams = {
      user_email: email,
      user_name: firstName,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log("✅ Welcome email sent:", response.status, response.text);
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
  }
};
