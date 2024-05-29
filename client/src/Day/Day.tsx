import './Day.scss';
import Draggable from 'react-draggable';
import Event from '../Event/Event';

type dayProps = {
    date: number,
    weekday: string,
    events: [],
}

const Day = (props: dayProps) => {

    const dailyEvents = (
        props.events.map((event) => {
            return (
                <Draggable axis='y' handle={".Day__event"}>
                    <Event title={event.title} 
                    time={event.time} 
                    key={event.title}/>
                </Draggable>
            )
        })
    )


    return (
        <div className="Day">
            <h3 className="Day__day-of-week">{props.weekday}</h3>
            <h3 className="Day__week-date">{props.date}</h3>
            <div className='Day__events-container'>{dailyEvents}</div>
        </div>
    )
}

export default Day;