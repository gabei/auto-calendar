import './Calendar.scss';
import Day from '../Day/Day';

export default function Calendar(props) {
    const data = props.data;
    
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
            {/*load the calendar only if the dateList is populated} */}
            {dateList && <PrintableCalendar />}
        </div>//calendar
    )
}