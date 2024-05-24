import { useState } from "react";
import Draggable from 'react-draggable';
import './Event.scss';

type eventProps = {
    title: string,
    time: string,
    controlToggle: boolean
}

const Event = (props: eventProps) => {
    const [resize, setResize] = useState({
        active: false,
        y: 0
    });

    const [height, setHeight] = useState(96);

    const handleMouseDown = (e: MouseEvent) => {
        console.log("Mouse down")
        setResize({ 
            active: true,
            y: e.clientY
        });
    }

    const handleMouseMove = (e: MouseEvent) => {
        const { active, y } = resize;
        if(active){
            console.log("Mouse moving");
            const yDiff: number = Math.abs(y - e.clientY);
            const newHeight: number 
                = y > e.clientY ? height - yDiff : height + yDiff;

            setResize( {...resize, y: e.clientY});
            setHeight(newHeight);
        }
        
    }

    const handleMouseUp = () => {
        console.log("Mouse up")
        setResize({...resize, active: false});
        
    }

    const eventStyle = {
        height: `${height}px`
    }

    return (
        <Draggable axis='y' handle={".Event__reposition"}>
            <div className="Event" style={eventStyle}>
                <h3>{props.title}</h3>
                <p>{props.time}</p>
                <div 
                    className={"Event__reposition " + (props.controlToggle ? "visible" : "") }></div>
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