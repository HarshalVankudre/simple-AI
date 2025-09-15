import  express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



app.get('/api/hello', (req:Request, res:Response) =>
    res.send({ message: "hello world"}));

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));

