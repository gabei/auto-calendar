import axios from "axios";
import * as cheerio from "cheerio";
import { CalendarDate, Event } from "./types";


const TARGETURL: string = "https://laketravislibrary.org/meeting-room/";
const TITLECLASS: string = ".tribe-events-calendar-month__calendar-event-title-link";
const TIMECLASS: string = ".tribe-events-calendar-month__calendar-event-datetime time";



function formatDateYYYYMMDD(date: Date): string {
    // Inputs: a raw date object
    // Outputs: A string of the date in format YYYY-MM-DD
    return date.toISOString().split('T')[0];
}


function createTargetIdName(dateString: string){
    if(!dateString){
        throw new Error("Empty string passed where string expected")
    }
    if(dateString.length < 10){
        throw new Error("String length must equal that of the format YYYY-MM-DD (10)");
    }

    const classPrefix:string = "#tribe-events-calendar-day-";
    return classPrefix + dateString;
}


export default async function populateCalendarWeek (userDate: string){
    const response = await axios.get(TARGETURL);
    const $ = cheerio.load(response.data);

    const calendarWeek: CalendarDate[] = []; 

    userDate += "T00:00:00"; // set local time zone
    const startingDate = new Date(userDate);
    console.log("user date: " + userDate.toLocaleUpperCase());
    console.log("STARTING DATE: " + startingDate);
    
    // begin with monday and iterate through saturday
    let today = new Date(startingDate);
    let weekLength = 6;

    for(let i = 0; i < weekLength; i++) {
        today.setDate(startingDate.getDate() + i);
        console.log("today: " + today);

        
        let weekday: CalendarDate = {
            date: today.getDate(),
            weekday: today.toDateString().slice(0,3),
            events: [] as Event[]
        };
    
        const currentDay = createTargetIdName(formatDateYYYYMMDD(today));

        console.log("currentDay: " + currentDay)

        let titles = 
            $(currentDay).find(TITLECLASS)
            .toArray().map((e) => $(e).text().trim());

        let times = 
            $(currentDay).find(TIMECLASS)
            .toArray().map((e) => $(e).text().trim());

        for(let i = 0; i < titles.length; i++){
            let eventTime: string = times.splice(0, 2).join(" - ");
            weekday.events.push({
                title: titles.shift() as string,
                time: eventTime
            })
        }
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
