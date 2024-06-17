
import Draggable from 'react-draggable';
import './Event.scss';

type eventProps = {
    title: string,
    time: string,
}

function handleDrag() {
    console.log(this.getPropertyValue("translate"));
}


const Event = (props: eventProps) => {
    return (
        <Draggable 
            axis='y' 
            handle={".Event__reposition"} 
            key={props.title}
            grid=[0,20]>
            <div className="Event">
                <h3>{props.title}</h3>
                <p>{props.time}</p>
                <div className="Event__reposition"></div>
            </div>
        </Draggable>
    )
}

export default Event;