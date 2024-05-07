import axios from "axios";
import * as cheerio from "cheerio";

const targetURL = "https://laketravislibrary.org/meeting-room/";
const today = formatDateYYYYMMDD(new Date());
console.log(today);


function formatDateYYYYMMDD(date: Date): string {
    // Inputs: a raw date object
    // Outputs: A string of the date in format YYYY-MM-DD
    return date.toISOString().split('T')[0];
}


async function main (){
    const response = await axios.get(targetURL);
    const $ = cheerio.load(response.data);

    const weekSelector = ".tribe-events-calendar-month__week";
}


/*
DEXPORT FUNCTIONS FOR 
*/
export const testExports = {
    formatDateYYYYMMDD
}
