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
    const day = $(selectedDay);
    console.log("day:\n" + week2)

    //console.log("week 1:\n" + week);
}

main();




// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    formatDateYYYYMMDD,
    createTargetIdName
}
