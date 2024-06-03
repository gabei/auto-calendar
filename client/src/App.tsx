import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import './App.scss'
import Calendar from './Calendar/Calendar'

function App() {
  const [data , setData] = useState([]);
  const [chosenDate, setChosenDate] = useState('');
  const printRef = useRef(null);


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


  const WrappedCalendar = () => {
    return (
      <div className="border-preview-wrapper">
        <Calendar ref={printRef} data={data}></Calendar>
      </div>
    )
  }

  
  return (
    <div className="App">
      <label htmlFor="Calendar__input"></label>
            <input onChange={e => handleChange(e.target.value)}
                type="date" 
                className="Calendar__input" 
                name="Calendar__input"/>
            <button onClick={handleGetCalendarData}>Get Data</button>
            <button onClick={handlePrintCalendar}>Print Calendar</button>

      
      { data.length ? <WrappedCalendar /> : null}
      
    </div>
  )
}

export default App
