import './Day.scss';
import Draggable from 'react-draggable';

type dayProps = {
    date: number,
    weekday: string,
    events: []
}

const Day = (props: dayProps) => {

    const dailyEvents = (
        props.events.map((event) => {
            return (
                <Draggable axis='y'>
                    <li className="Day__event">
                        <h3>{event.title}</h3>
                        <p>{event.time}</p>
                    </li>
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