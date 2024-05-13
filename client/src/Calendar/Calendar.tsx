import { useState } from 'react';
import './Calendar.css';

export default function Calendar() {

    return (
        <div className='Calendar'>
            <label htmlFor="Calendar__input"></label>
            <input type="date" className="Calendar__input" name="Calendar__input" />
        </div>
    )
}