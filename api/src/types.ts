type CalendarDate = {
    date: number,
    events: Event[]
}

type Event = {
    title: string,
    time: string
}

export type {CalendarDate, Event};