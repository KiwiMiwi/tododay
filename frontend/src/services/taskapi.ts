import { TaskModel } from "../models/task";

const baseUrl = "/api/tasks"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if(response.ok){
        return response
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getTaskById(id: string): Promise<TaskModel> {
    const res = await fetchData(`${baseUrl}/${id}`, { method: "GET" });
    return await res.json();
}