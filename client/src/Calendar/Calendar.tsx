import React from 'react';
import './Calendar.scss';
import Day from '../Day/Day';
import logo from '../assets/ltcl-logo_183x300.jpg';
import qrcode from '../assets/qrcode.jpg';

export const Calendar = React.forwardRef((props, ref) => {
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

    const CalendarContent = () => {
        return (
                <div className="Calendar__content">
                    <h1 className="Calendar__title">Meeting Room Schedule</h1>
                    {dateList}
                    <CalendarNotice />
                </div>
        )
    }

    
    return (
            <div className='Calendar' ref={ref}>
                
                {/*load the calendar only if the dateList is populated} */}
                {dateList && <CalendarContent />}
                
                <img 
                    className="Calendar__logo" 
                    src={logo}
                    alt="Library Logo" />

                <div className = "Calendar__qrcode-container">
                    <img 
                        className="Calendar__qrcode-container__code" 
                        src={qrcode}
                        alt="QR Code" />
                    <p className="Calendar__qrcode-container__info">
                    Scan this code to view our online calendar.
                    </p>
                </div>
                
            </div>
    )
});

export default Calendar;