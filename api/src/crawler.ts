import axios from "axios";
import * as cheerio from "cheerio";


const targetURL = "https://laketravislibrary.org/meeting-room/";
const today = new Date();
const todayString = formatDateYYYYMMDD(today);


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

function getCurrentWeek(idName: string): string {
    const weekSelector = ".tribe-events-calendar-month__week";
    return '';
}


async function main (){
    const response = await axios.get(targetURL);
    const $ = cheerio.load(response.data);

    const weekSelector = ".tribe-events-calendar-month__week";
    const selectedDay = createTargetIdName(formatDateYYYYMMDD(new Date()));;
    const week = $(selectedDay).closest(weekSelector);
    //console.log(week);
    // here let's use a wildcard CSS selector to get all IDs that match a specific day of the week
    // example in vanilla JS: document.queryselectorAll("div[id^='']")
    
    // ALTERNATIVELY
    // select WEEKSELECTOR that has SELECTED DAY
    // then continue with above
    console.log("Target element: ")
    const week2 = $(`${weekSelector}`).has(selectedDay);
}

main();




// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    formatDateYYYYMMDD,
    createTargetIdName
}
