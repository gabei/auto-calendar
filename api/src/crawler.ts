import axios from "axios";
import * as cheerio from "cheerio";
import { CalendarDate, Event } from "./types";

// these constants represent the initial url, 
// dom query selectors, and relevant calendar length
const TARGETURL: string = "https://laketravislibrary.org/meeting-room/";
const TITLECLASS: string = ".tribe-events-calendar-month__calendar-event-title-link";
const TIMECLASS: string = ".tribe-events-calendar-month__calendar-event-datetime time";
const WEEKLENGH: number = 6;


function formatDateYYYYMMDD(date: Date): string {
    // Inputs: a raw date object
    // Outputs: A string of the date in format YYYY-MM-DD
    return date.toISOString().split('T')[0];
}


function createTargetIdName(dateString: string){
    // Inputs: Date string in the format YYYY-MM-DD
    // Outputs: class string with date appended on the end
    if(!dateString){
        throw new Error("Empty string passed where string expected");
    }
    if(dateString.length < 10){
        throw new Error("String length must equal that of the format YYYY-MM-DD (10)");
    }

    const classPrefix:string = "#tribe-events-calendar-day-";
    return classPrefix + dateString;
}


export default async function populateCalendarWeek (userDate: string | undefined){
    // Inputs: a starting calendar date in the form YYYY-MM-DD
    // Outputs: an array of objects representing days of the week and their events

    if(!userDate || userDate == undefined) {
        throw new Error("User did not provide a date. Check that dates are being validated on the user end.");
    }

    // navigate to LTCL website and load in DOM
    const response = await axios.get(TARGETURL);
    const $ = cheerio.load(response.data);

    // calenderWeek holds all CalendarDates, representing days containing events
    const calendarWeek: CalendarDate[] = []; 

    // begin with monday (starting date represented by userDate)
    // and iterate through saturday using i to increase date object's date
    userDate += "T00:00:00"; // set local time zone
    const startingDate = new Date(userDate);
    let today = new Date(startingDate);

    for(let i = 0; i < WEEKLENGH; i++) {
        today.setDate(startingDate.getDate() + i);

        // each date creates a weekday holding all information related
        // including array of events
        let weekday: CalendarDate = {
            date: today.getDate(),
            weekday: today.toDateString().slice(0,3),
            events: [] as Event[]
        };
    

        // create a DOM ID to use for data scraping below
        const currentDay = createTargetIdName(formatDateYYYYMMDD(today));

        let titles = 
            $(currentDay).find(TITLECLASS)
            .toArray().map((title) => $(title).text().trim());

        let times = 
            $(currentDay).find(TIMECLASS)
            .toArray().map((time) => $(time).text().trim());

        // push all event titles and times into the events array as 
        // object representing a singular event
        titles.forEach((title)=> {
            let eventTime: string = times.splice(0, 2).join(" - ");
            let newTitle = title;
            weekday.events.push({
                title: newTitle as string,
                time: eventTime
            })
        });
        
        // weekday is appended to calendarWeek
        calendarWeek.push(weekday);  
    }
    return calendarWeek;
}


// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    populateCalendarWeek,
    formatDateYYYYMMDD,
    createTargetIdName 
}
