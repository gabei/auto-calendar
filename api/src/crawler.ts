import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";


const targetURL = "https://laketravislibrary.org/meeting-room/";



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

async function main (){
    const response = await axios.get(targetURL);
    const $ = cheerio.load(response.data);


    type CalendarDate = {
        date: number,
        events: Event[]
    }

    type Event = {
        title: string,
        time: string
    }

    const startingDate = new Date();
    let i: number = 0;
    let weekLength = 6;
    do {
        const day = <CalendarDate>{};
        const today = new Date(startingDate);
        
        today.setDate(startingDate.getDate() + i);
        const currentDay = createTargetIdName(formatDateYYYYMMDD(today));

        $(currentDay)
        .find(".tribe-events-calendar-month__calendar-event-title-link")
        .each((_, element) => {
            let newEvent = <Event>{};
            newEvent.title = $(element).text().trim();
            newEvent.time = 'time AM - time PM';
            console.log(newEvent.title);
            console.log(newEvent.time);
            //day.events.push(newEvent); // TYPE ERROR
        });

        day.date = today.getDate();
        console.log(day.date);
        console.log(day.events); // UNDEFINED
        i++;
    } while(i < weekLength);
}
    

main();




// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    formatDateYYYYMMDD,
    createTargetIdName
}
