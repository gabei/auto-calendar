import express, {Express, Request, Response} from "express";
import dotenv = require('dotenv');
import populateCalendarWeek from './crawler';
import { CalendarDate } from './types';
import bodyParser from 'body-parser';

dotenv.config();
const app: Express = express();
const port: number = 3000;

const cors = require('cors');
const withOptions = {
    origin: [
        "http://localhost:5173", 
        "https://localhost:5173", 
        "localhost:5173"
    ],
    succeessStatus: 200
}
app.use(cors(withOptions));

const jsonParser = require("body-parser");
app.use(jsonParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send(`The typescript server is running on port ${port}.`);
})

app.post('/calendar', async (req: Request, res: Response) => {
    console.log("A post request has been sent to the server.");
    console.log("Payload is " + req.body.date);
    const data: CalendarDate[] = await populateCalendarWeek();
    res.send({data});
});

app.listen(port, () => {
    console.log(`Application listening at port http://localhost:${port}`);
});