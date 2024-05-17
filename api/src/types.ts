type CalendarDate = {
    date: number,
    weekday: string
    events: Event[]
}

type Event = {
    title: string,
    time: string
}

export type {CalendarDate, Event};