import { testExports as t } from "./crawler";


test('Date objects should return a string MMMM-YY-DD', ()=> {
    expect(
        t.formatDateYYYYMMDD(new Date('Wed May 08 2024 12:00:00')))
        .toBe("2024-05-08");

    expect(
        t.formatDateYYYYMMDD(new Date('Thu May 09 2024 13:10:00')))
        .toBe("2024-05-09");

    expect(
        t.formatDateYYYYMMDD(new Date('Mon May 20 2024 10:30:00')))
        .toBe("2024-05-20");

    expect(
        t.formatDateYYYYMMDD(new Date('Fri Jan 07 2022 08:54:00')))
        .toBe("2022-01-07");
});