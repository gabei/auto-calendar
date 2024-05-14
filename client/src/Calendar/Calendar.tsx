import { useState } from 'react';
import './Calendar.css';

export default function Calendar() {
    const [data, setData] = useState();

    async function handleClick() {
        console.log("Making an http request to the proxy server...");

        const response = await fetch("http://localhost:3000/calendar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"Test Post": " Hello world!"})
        });
        
        const data = await response.json();
        console.log(data);
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
            <p>
                {data || "No data received yet..."}
            </p>
        </div>
    )
}