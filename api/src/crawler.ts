import axios from "axios";
import * as cheerio from "cheerio";


const targetURL = "https://laketravislibrary.org/meeting-room/";
const today = new Date();


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

    let i: number = 0;
    let weekLength = 6;
    do {
        today.setDate(today.getDate() + i);
        const currentDay = createTargetIdName(formatDateYYYYMMDD(today));
        console.log(currentDay);
        i++;
    } while(i < weekLength);

    //console.log("day:\n" + day);

}

main();




// EXPORT FUNCTIONS FOR TESTING
export const testExports = {
    formatDateYYYYMMDD,
    createTargetIdName
}
