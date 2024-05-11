import axios from "axios";
import * as cheerio from "cheerio";

// extract this into env variable later
const TARGETURL: string = "https://laketravislibrary.org/meeting-room/";
const TITLECLASS: string = ".tribe-events-calendar-month__calendar-event-title-link";
const TIMECLASS: string = ".tribe-events-calendar-month__calendar-event-datetime time";

type CalendarDate = {
    date: number,
    events: Event[]
}

type Event = {
    title: string,
    time: string
}


async function populateCalendarWeek (){
    const response = await axios.get(TARGETURL);
    const $ = cheerio.load(response.data);

    const calendarWeek: CalendarDate[] = []; 
    const startingDate = new Date();
    
    // begin with monday and iterate through saturday
    let today = new Date(startingDate);
    let weekLength = 6;

    for(let i = 0; i < weekLength; i++) {
        today.setDate(startingDate.getDate() + i);

        
        let weekday: CalendarDate = {
            date: today.getDate(),
            events: [] as Event[]
        };
    
        const currentDay = createTargetIdName(formatDateYYYYMMDD(today));

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
    console.log(calendarWeek);
    return calendarWeek;
}


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
populateCalendarWeek();

// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    populateCalendarWeek,
    formatDateYYYYMMDD,
    createTargetIdName 
}
