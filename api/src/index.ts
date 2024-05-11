import populateCalendarWeek from './crawler';

import dotenv = require('dotenv');
dotenv.config();

import express, {Express, Request, Response} from "express";
const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send(`The typescript server is running on port ${port}.`);
})

app.get("/calendar", async (req: Request, res: Response) => {
    const response = await populateCalendarWeek();
    res.send(response);
})

app.listen(port, () => {
    console.log(`Application listening at port ${port}`);
});