import puppeteer from "puppeteer";

const calendar: {url: string}  = {
    url: "https://laketravislibrary.org/meeting-room/"
}

type calendar_event = {
    date: Number,
    title: string,
    time: string
}

/* CLIENT will provide the upcoming week from which
    to get a calendar date
    - calendar classes are listed as:
    - "tribe-events-calendar-day-YYYY-MM-DD"
    - prefix: "tribes-events-calendar-day"
    - suffix: "YYYY-MM-DD"
*/
const date_prefix: string = "tribe-events-calendar-day-";
const date_string_length: number = 10;

function get_date_string(
    date_prefix: string,
    date_object: Date, 
    string_length: number): 
    string {
        return (
            date_prefix + 
            date_object.toISOString().slice(0, string_length)
        )
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

// async function main() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(calendar.url);

//     await browser.close();
// }