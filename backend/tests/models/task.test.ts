import task from "../../src/models/task";
import tasklist from "../../src/models/tasklist";
import DB from "./DB";

beforeAll(async () => await DB.connect());
afterEach(async () => await DB.clear());
afterAll(async () => await DB.close());


test("create Task",async () => {
    const tasklist1 = new tasklist({date:"24. Dez"});
    const task1 = new task({description:"Weihnachtsgeschenke kaufen", done: "false", tasklist: tasklist1});
    
    const res = await task1.save()

    expect(res).toBeDefined();
});