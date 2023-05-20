import {ElementStates} from "../../types/element-states";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getQueue: () => T[];
  clearQueue: () => void;
  getTail: () => number;
  getHead: () => number;
  getSize: () => number;
  getLength: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private headIndex = 0;
  private tailIndex = -1;
  private readonly size: number = 0;
  private length: number = 0;
  private item = {value: '', state: ElementStates.Default};

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(this.item);
  }

  enqueue(item: T): void {
    if (this.tailIndex >= this.size) {
      throw new Error("Превышена максимальная длина очереди");
    }
    this.container[this.tailIndex + 1] = item;
    this.tailIndex++;
    this.length++;
  }

  dequeue(): void {
    if (this.length === 0) {
      throw new Error("Очередь пустая");
    }
    this.container[this.headIndex] = this.item as any;
    this.headIndex++;
    this.length--;

  }

  clearQueue(): void {
    this.container = Array(this.size).fill(this.item);
    this.headIndex = 0;
    this.tailIndex = -1;
    this.length = 0;
  }

  getQueue(): T[] {
    return this.container;
  }

  getSize(): number {
    return this.size;
  }

  getTail(): number {
    return this.tailIndex;
  }

  getHead(): number {
    return this.headIndex;
  }

  getLength(): number {
    return this.length;
  }

}
