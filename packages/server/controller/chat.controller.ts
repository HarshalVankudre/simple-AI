import type { Request, Response } from "express";
import z from "zod";
import { chatService } from "../services/chat.service.ts";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(1000, "Prompt is too long"),

  conversationID: z.string().uuid(),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parseResult = chatSchema.safeParse(req.body);

    if (!parseResult.success) {
      // @ts-ignore
      res.status(400).json({ error: parseResult.error.issues[0].message });
      return;
    }

    try {
      const { prompt, conversationID } = parseResult.data;

      const chatResponse = await chatService.sendMessage(
        prompt,
        conversationID
      );

      res.json({ message: chatResponse.message });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  },
};