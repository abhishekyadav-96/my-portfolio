"use server";

import { z } from "zod";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await dbConnect();
    await Message.create(validatedFields.data);

    return {
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Something went wrong. Please try again later.",
    };
  }
}