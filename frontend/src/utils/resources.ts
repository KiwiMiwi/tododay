export interface taskList {
    [key: string]: {
      "description": string,
      "done": boolean
    }
}

export interface taskListDaily {
    [key: string]: taskList
}