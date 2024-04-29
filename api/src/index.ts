import express, {Express, Request, Response} from "express";
import dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port: number = 3000;


app.get("/", (req: Request, res: Response) => {
    res.send("The typescript server is running.");
})

app.listen(port, () => {
    console.log(`Application listening at port ${port}`);
});