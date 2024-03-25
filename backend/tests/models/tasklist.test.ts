import tasklist from "../../src/models/tasklist";
import DB from "./DB";

beforeAll(async () => await DB.connect());
afterEach(async () => await DB.clear());
afterAll(async () => await DB.close());

test("create tasklist", async () => {
    const tasklist1 = new tasklist({date:"24. Dez"});
    const res = await tasklist1.save()

    expect(res).toBeDefined();
});