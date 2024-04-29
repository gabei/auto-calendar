import puppeteer from "puppeteer";

const calendar: {url: string}  = {
    url: "https://laketravislibrary.org/meeting-room/"
}

type calendar_event = {
    date: Number,
    title: string,
    time: string
}

/* REQUIREMENTS
    - navigate to meeting room calendar page
    - find the upcoming week via class name or text content
    - create an array to hold the incoming data
    - iterate over the days monday through saturday
    - on each day, create an object of type calendar_event
        to hold the date, title, and time
    - return the array to the server for response to client
*/

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(calendar.url);

    await browser.close();
}