import { useState } from 'react'
import './App.scss'
import Calendar from './Calendar/Calendar'

function App() {
  const [data , setData] = useState([]);

    async function handleClick() {
        const response = await fetch("http://localhost:3000/calendar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"Test Post": " Hello world!"})
        });
        
        const data = await response.json();
        const dates = data.data;
    
        setData(dates);
    }

    function handlePrint() {
      
    }

  return (
    <div className="App">
      <label htmlFor="Calendar__input"></label>
            <input 
                type="date" 
                className="Calendar__input" 
                name="Calendar__input" />
            <button onClick={handleClick}>Get Dates</button>
            <button onClick={handlePrint}>Print</button>

      {data.length && <Calendar data={data}></Calendar>}
    </div>
  )
}

export default App
