import { useState } from 'react';
import './Calendar.css';

export default function Calendar() {
    const [data, setData] = useState();


    function handleClick() {
        console.log("Making an http request to te local host...");
        const request = new XMLHttpRequest; 

        request.open('GET', 'http://localhost:3000');
        request.onload = function() {
            if(request.status === 200){
                setData(JSON.parse(request.responseText));
            }
        }

        request.send();
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