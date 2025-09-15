import app from "client/src/App.tsx";
import {chatController} from "./controller/chat.controller.ts";
import express from "express";

const router = express.Router();



router.post('/api/chat', chatController.sendMessage);

export default router;