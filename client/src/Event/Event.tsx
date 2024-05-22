import { useState } from "react";
import Draggable from 'react-draggable';
import './Event.scss';

type eventProps = {
    title: string,
    time: string,
    controlToggle: boolean
}

const Event = (props: eventProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        console.log("Mouse down")
        setIsDragging(true)
    }

    const handleMouseMove = () => {
        if(isDragging) console.log("Mouse move")
    }

    const handleMouseUp = () => {
        setIsDragging(false);
        console.log("Mouse up")
    }

    return (
        <Draggable axis='y' handle={".Event"}>
            <div className="Event">
                <h3>{props.title}</h3>
                <p>{props.time}</p>
                <div 
                    className={"Event__resize " + (props.controlToggle ? "visible" : "") }
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}></div>
            </div>
        </Draggable>
    )
}

export default Event;