interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T ;
  getSize: () => number;
  getStack: () => T[];
  clearAll: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };
  pop = (): void => {
    if (this.getSize() > 0) {
      this.container.pop();
    }
  };
  peak = (): T => {
    if(this.container.length === 0){throw new Error("No elements in the stack");}
    return this.container[this.getSize() - 1];
  };
  getSize = () => this.container.length;
  getStack = (): T[] => this.container;
  clearAll = () => this.container = [];
}
