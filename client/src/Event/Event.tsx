import { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import './Event.scss';

type eventProps = {
    title: string,
    time: string,
    controlToggle: boolean
}

const Event = (props: eventProps) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <Draggable axis='y' handle={".Event"}>
            <div className="Event">
                <h3>{props.title}</h3>
                <p>{props.time}</p>
                <div 
                    className={"Event__resize " + (props.controlToggle ? "visible" : "") }></div>
            </div>
        </Draggable>
    )
}

export default Event;