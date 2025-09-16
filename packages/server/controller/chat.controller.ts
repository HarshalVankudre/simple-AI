import type {Request, Response} from "express";
import {chatService} from "../services/chat.service.ts";
import z from "zod";

const chatSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, 'Prompt is rquired')
        .max(1000, 'Prompt is too long'),

    conversationID: z.string().uuid()


})

export const chatController =  {
    async sendMessage(req: Request, res: Response) {
         const parseResult = chatSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error.format() });
        return;
    }



    try {
            const { prompt, conversationID } = req.body;
           const response = await chatService.sendMessage(prompt, conversationID);

    res.json({message: response.message})

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
    }
}