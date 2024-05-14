import { ReactNode, useEffect, useState } from 'react';
import './Calendar.css';

export default function Calendar() {
    const initialValue = [];
    const [data , setData] = useState(initialValue);

    async function handleClick() {
        console.log("Making an http request to the proxy server...");

        const response = await fetch("http://localhost:3000/calendar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"Test Post": " Hello world!"})
        });
        
        const data = await response.json();
        const dates = data.data;
        console.log(dates);
        setData(dates);
    }

    const dateList = (
        data.map((day) => {
            return <li key={day.date}>{day.date}</li>
        })
    )

    return (
        <div className='Calendar'>
            <label htmlFor="Calendar__input"></label>
            <input 
                type="date" 
                className="Calendar__input" 
                name="Calendar__input" />
            <button 
                onClick={handleClick}>Get Dates</button>
            <div>
                {dateList.length ? dateList : "No data yet..."}
            </div>
            
            
        </div>
    )
}