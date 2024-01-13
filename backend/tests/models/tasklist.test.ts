import task from "../../src/models/task";
import tasklist from "../../src/models/tasklist";
import DB from "./DB";

beforeAll(async () => await DB.connect());
afterEach(async () => await DB.clear());
afterAll(async () => await DB.close());

test("create tasklist", async () => {
    const task1 = new task({description:"Weihnachtsgeschenke kaufen", done: "false"});
    const tasklist1 = new tasklist({date:"24. Dez", task: task1});
    const res = await tasklist1.save()
    expect(res).toBeDefined();
});