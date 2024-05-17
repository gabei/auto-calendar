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

    const CalendarNotice = () => {
        return (
            <div className="Calendar__notice">
                <h4>The meeting room is available for public use as a quiet space when not reserved.</h4>
            </div>
        )
    }

    const dateList = (
        data.map((day) => {
            return <Day 
                date={day.date} 
                weekday={day.weekday}
                events={day.events} 
                key={day.date} />
        })
    )

    const PrintableCalendar = () => {
        return (
            <div className="Calendar__printable">
                {dateList}
                <CalendarNotice />
            </div>
        )
    }

    return (
        <div className='Calendar'>
            <label htmlFor="Calendar__input"></label>
            <input 
                type="date" 
                className="Calendar__input" 
                name="Calendar__input" />
            <button 
                onClick={handleClick}>Get Dates</button>

            {/*load the calendar only if the dateList is populated} */}
            {dateList && <PrintableCalendar />}
        </div>//calendar
    )
}