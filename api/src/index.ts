import express, {Express, Request, Response} from "express";
import dotenv = require('dotenv');
import populateCalendarWeek from './crawler';
import { CalendarDate } from './types';

dotenv.config();
const app: Express = express();
const port: number = 3000;

const cors = require('cors');
const withOptions = {
    origin: "http://localhost:5173/" ,
    succeessStatus: 200
}

app.use(cors(withOptions));

app.get("/", (req: Request, res: Response) => {
    res.send(`The typescript server is running on port ${port}.`);
})

app.get("/calendar", cors(withOptions), async (req: Request, res: Response) => {
    const response: CalendarDate[] = await populateCalendarWeek();
    res.send(response);
})

app.listen(port, () => {
    console.log(`Application listening at port http://localhost:${port}`);
});