import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { OpenAI } from "openai";
import { z } from 'zod';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const chatSchema = z.object({
    prompt: z.string().min(1).max(1000),
    conversationID: z.string().uuid()
});

app.get('/api/hello', (req: Request, res: Response) =>
    res.send({ message: "hello world" }));

const conversations = new Map<string, OpenAI.Chat.ChatCompletionMessageParam[]>();

app.post('/api/chat', async (req: Request, res: Response) => {
    try {
        const { prompt, conversationID } = req.body;

        const parseResult = chatSchema.safeParse({ prompt, conversationID });
        if (!parseResult.success) {
            res.status(400).json({ error: parseResult.error.format() });
            return;
        }

        let messages = conversations.get(conversationID) || [];
        messages.push({ role: 'user', content: prompt });

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.2,
            max_completion_tokens: 1024,
        });

        const assistantMessage = response.choices[0]?.message?.content || '';
        messages.push({ role: 'assistant', content: assistantMessage });
        conversations.set(conversationID, messages);

        res.json({ message: assistantMessage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));