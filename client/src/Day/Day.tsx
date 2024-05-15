import './Day.scss';

type dayProps = {
    date: number,
    events: []
}

const Day = (props: dayProps) => {
    console.log(props);

    return (
        <div>{props.date}</div>
    )
}

export default Day;