export interface taskList {
    [key: string]: {
      "description": string,
      "done": boolean
    }
}

export interface tasksOfDay {
    [key: string]: taskList
}