import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import './App.scss'
import Calendar from './Calendar/Calendar'

function App() {
  const [data , setData] = useState([]);
  const [chosenDate, setChosenDate] = useState('');
  const [controlToggle, setControlToggle] = useState(true);
  const printRef = useRef(null);


  const handleToggleControls = () => {
    setControlToggle((prevToggle) => {
      return !prevToggle;
    });
  }


  const handleChange = (inputDate:string):void => { 
    setChosenDate(inputDate);
  
  }


  const handleGetCalendarData = async () => {
    const response = await fetch("http://localhost:3000/calendar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({date: chosenDate})
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
            <input onChange={e => handleChange(e.target.value)}
                type="date" 
                className="Calendar__input" 
                name="Calendar__input"/>
            <button onClick={handleGetCalendarData}>Get Data</button>
            <button onClick={handlePrintCalendar}>Print Calendar</button>
            <button onClick={handleToggleControls}>Toggle Controls</button>

      <div className="border-preview-wrapper">
      {data.length && 
      <Calendar ref={printRef} data={data} controlToggle={controlToggle}></Calendar>}
      </div>
    </div>
  )
}

export default App
