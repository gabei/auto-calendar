import React from 'react';
import './Calendar.scss';
import Day from '../Day/Day';
import qrcode from '../assets/qrcode_uncropped.png';

export const Calendar = React.forwardRef((props, ref) => {
    const data = props.data;
    
    const CalendarNotice = () => {
        return (
            <div className="Calendar__notice">
                <div className="Calendar__notice--title-wrapper">
                <h4>The meeting room is available for public use as a quiet space when not reserved. Scan for more information.</h4>
                </div>
                <img className="Calendar__qrcode-container__code" 
                    src={qrcode}
                    alt="QR Code" />
            </div>
        )
    }


    const dateList = (
        data.map((day) => {
            return <Day 
                date={day.date} 
                weekday={day.weekday}
                events={day.events} 
                key={day.date}
                controlToggle={props.controlToggle} />
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
            </div>
    )
});

export default Calendar;