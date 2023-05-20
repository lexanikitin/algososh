interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
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
  peak = (): T | null => {
    return this.container.length ? this.container[this.getSize() - 1] : null;
  };
  getSize = () => this.container.length;
  getStack = (): T[] => this.container;
  clearAll = () => this.container = [];
}
