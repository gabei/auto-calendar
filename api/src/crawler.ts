import puppeteer from "puppeteer";

/* CLIENT will provide the upcoming week from which
    to get a calendar date
    - calendar classes are listed as:
    - "tribe-events-calendar-day-YYYY-MM-DD"
    - prefix: "tribes-events-calendar-day"
    - suffix: "YYYY-MM-DD"
*/
type date_info = {
    length: number,
    prefix: string,
    date: Date,
    class_name: string
}

const date: date_info = {
    length: 10,
    prefix: "tribe-events-calendar-day-",
    date: new Date() // will be received from client
}

function get_date_string(date: date_info): string  {
    return (
        date.prefix + date.date.toISOString().slice(0, date.length)
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

const calendar: {url: string, date_class: string}  = {
    url: "https://laketravislibrary.org/meeting-room/",
    date_class: get_date_string(date)
}

type calendar_event = {
    date: Number,
    title: string,
    time: string
}

console.log(calendar.date_class);

// async function main() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(calendar.url);

//     await browser.close();
// }