import axios from "axios";
import * as cheerio from "cheerio";

const targetURL = "https://laketravislibrary.org/meeting-room/";



async function main (){
    //axios.get(url, [...options]);
    const response = await axios.get(targetURL);
    const $ = await cheerio.load(response.data);

}
