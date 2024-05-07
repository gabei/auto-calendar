import { testExports as t } from "./crawler";


test('test description', ()=> {
    expect(
        t.formatDateYYYYMMDD(new Date()))
        .toBe("2024-05-07");
});