/*
    Event resizing code is modified from this stack overflow answer:
    https://stackoverflow.com/questions/60792300/how-to-create-a-resizable-component-in-react
*/

import { useState, memo } from "react";
import Draggable from 'react-draggable';
import './Event.scss';

type eventProps = {
    title: string,
    time: string,
}


const Event = (props: eventProps) => {
    const [resize, setResize] = useState({
        active: false,
        y: 0
    });
    const [height, setHeight] = useState(96);
    const eventStyle = {height: `${height}px`}


    const handleMouseDown = (e: MouseEvent) => {
        setResize({ 
            active: true,
            y: e.clientY
        });
    }


    const handleMouseMove = (e: MouseEvent) => {
        const { active, y } = resize;
        if(active){
            const yDiff: number = Math.abs(y - e.clientY);
            const newHeight: number 
                = y > e.clientY ? height - yDiff : height + yDiff;

            setResize( {...resize, y: e.clientY});
            setHeight(newHeight);
        }
    }


    const handleMouseUp = () => {
        setResize({...resize, active: false});
    }

    return (
        <Draggable axis='y' key={props.title}>
            <div className="Event" style={eventStyle}>
                <h3>{props.title}</h3>
                <p>{props.time}</p>
                <div 
                    className="Event__reposition"></div>
                <div 
                    className="Event__resize "
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}></div>
                
            </div>
        </Draggable>
    )
}

const alwaysCallPropsEqual = () => {
    return true;
}

const memoizedEvent = memo(Event, alwaysCallPropsEqual);
export default memoizedEvent;