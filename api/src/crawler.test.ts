import { testExports as t } from "./crawler";


/* formatDateYYYYMMDD()
____________________________________________________________*/

test('Date objects should return a string MMMM-YY-DD', ()=> {
    expect(
        t.formatDateYYYYMMDD(new Date('Mon May 20 2024 10:30:00')))
        .toBe("2024-05-20");

    expect(
        t.formatDateYYYYMMDD(new Date('Fri Jan 07 2022 08:54:00')))
        .toBe("2022-01-07");
});

test('Date objects should return a string MMMM-YY-DD', ()=> {
    expect(
        t.formatDateYYYYMMDD(new Date('1992, 01, 07')))
        .toBe("1992-01-07");

    expect(
        t.formatDateYYYYMMDD(new Date('1998, 05, 01')))
        .toBe("1998-05-01");
})


/* createTargetIdName()
____________________________________________________________*/

test('Strings should be returned in format PREFIX + INPUT STRING', ()=> {
    expect(
        t.createTargetIdName("1992-01-07"))
        .toBe("#tribe-events-calendar-day-1992-01-07");

    expect(
        t.createTargetIdName("2024-05-20"))
        .toBe("#tribe-events-calendar-day-2024-05-20");
})

test ('Strings should be the appropriate length', () => {
    expect(() => {
        t.createTargetIdName("")
    }).toThrow("Empty string passed where string expected")
        
    expect(() => {
        t.createTargetIdName("2024-5-2")
    }).toThrow("String length must equal that of the format YYYY-MM-DD (10)")

})

/* populateCalendarWeek()
____________________________________________________________*/
test('Function should return array with nested object structure.', async () => {
    const returnedArray = await t.populateCalendarWeek();

    returnedArray.forEach((item) => {
        expect(item).toHaveProperty("date", expect.any(Number));
        expect(item).toHaveProperty("events", expect.any(Array));
    })
})