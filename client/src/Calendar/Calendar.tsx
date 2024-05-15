import { useState } from 'react';
import './Calendar.scss';
import Day from '../Day/Day';

export default function Calendar() {
    const [data , setData] = useState([]);

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
            return <Day date={day.date} events={day.events} key={day.date} />
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

            <div className="Calendar__printable">
                {/* day components will fill this container to make calendar columns */}
            </div>
            
        </div>//calendar
    )
}