import puppeteer, { ElementHandle, NodeFor } from "puppeteer";

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
    date: Date
}

const date: date_info = {
    length: 10,
    prefix: "#tribe-events-calendar-day-",
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


    - DATA TO EXTRACT FROM EACH CALENDAR DATE
    - container: .tribe-events-calendar-month__calendar-event-details
    - title: .tribe-events-calendar-month__calendar-event-title-link
    - times: <time datetime="hh:mm">HH:MM AM/PM</time>
    - date: .tribe-events-calendar-month__day-date-link

    - MOST EFFICIENT PATH TO DATA EXTRACTION
    - start with day selector (Monday's date) sent by user
    = iterate over days to create new selectors and extract data
*/

const calendar: {url: string, date_id: string}  = {
    url: "https://laketravislibrary.org/meeting-room/",
    date_id: get_date_string(date)
}

type calendar_event = {
    date: Number,
    title: string,
    time: string
}



async function main() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(calendar.url);
    console.log("Accessing " + await page.title() + "...");
    console.log("Accessing ID " + calendar.date_id + "...");
    

    // const day_container = 
    //     page.waitForSelector(calendar.date_id);
    // const target = await page.$(calendar.date_id);
    // console.log(await target);

    // try evaluating the page for regular JS usage

    const week_data = await page.evaluate(() => {
        const target = document.querySelector("#tribe-events-calendar-day-2024-04-29");

        return target?.innerHTML;
    });
    console.log(await week_data);
    
    await browser.close();
}

main();

function parse_event_data(event_data: HTMLElement): string {
    return "done";
}