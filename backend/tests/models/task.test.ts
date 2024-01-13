import task from "../../src/models/task";
import DB from "./DB";

beforeAll(async () => await DB.connect());
afterEach(async () => await DB.clear());
afterAll(async () => await DB.close());


test("create Task",async () => {
    const task1 = new task({description:"Weihnachtsgeschenke kaufen", done: "false"});
    const res = await task1.save()
    expect(res).toBeDefined();
});