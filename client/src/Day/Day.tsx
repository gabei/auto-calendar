import './Day.scss';

type dayProps = {
    date: number,
    events: []
}

const Day = (props: dayProps) => {
    const dailyEvents = (
        props.events.map((event) => {
            return (
                <li className="Day__event">
                    <h3>{event.title}</h3>
                    <p>{event.time}</p>
                </li>
            )
        })
    )

    return (
        <div className="Day">
            <h2>{props.date}</h2>
            <div className='Day__events-container'>{dailyEvents}</div>
        </div>
    )
}

export default Day;