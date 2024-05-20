import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import './App.scss'
import Calendar from './Calendar/Calendar'

function App() {
  const [data , setData] = useState([]);
  const printRef = useRef(null);

    const handleGetCalendarData = async () => {
        const response = await fetch("http://localhost:3000/calendar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"Test Post": " Hello world!"})
        });
        
        const data = await response.json();
        const dates = data.data;
    
        setData(dates);
    }

    const handlePrintCalendar = useReactToPrint({
      content: ():null => printRef.current,
    });

  return (
    <div className="App">
      <label htmlFor="Calendar__input"></label>
            <input 
                type="date" 
                className="Calendar__input" 
                name="Calendar__input" />
            <button onClick={handleGetCalendarData}>Get Dates</button>
            <button onClick={handlePrintCalendar}>Print Calendar</button>

      {data.length && <Calendar ref={printRef} data={data}></Calendar>}
    </div>
  )
}

export default App
