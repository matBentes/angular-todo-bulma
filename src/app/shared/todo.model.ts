export class Todo {
  constructor(public text: string, public completed: boolean = false) {}
}

// alternative way
export interface ITodo {
  text: string;
  completed?: boolean;
}
