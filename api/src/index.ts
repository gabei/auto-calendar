import express, {Express, Request, Response} from "express";
import dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send(`The typescript server is running on port ${port}.`);
})

app.get("/calendar-data", (req: Request, res: Response) => {
    res.send("This page responds with the scraped meeting room calendar data.");
})

app.listen(port, () => {
    console.log(`Application listening at port ${port}`);
});