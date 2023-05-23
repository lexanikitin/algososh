import {Node} from "./Node";

interface IList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  prependTry: (element: T) => void;
  appendTry: (element: T) => void;
  getByIndex: (index: number) => Node<T> | null;
  cutHead: () => void;
  cutTail: () => void;
  insert: (element: T, index: number) => void;
  delete: (index: number) => void;
}

export class List<T> implements IList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor(values: T[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    for (let item of values) {
      this.append(item);
    }
  }

  prependTry(element: T) {
    this.head!.tryHead = element;
  }

  prepend(element: T) {
    this.head!.tryHead = null;
    const node = new Node(element, this.head);
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
    this.length++;
    return this;
  }

  appendTry(element: T) {
    this.tail!.tryTail = element;
  }

  append(element: T) {
    const node = new Node(element);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }

  getByIndex(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error("Индекс не существует");
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current.next;
      }
    }
    return current;
  }

  cutHead() {
    if (this.head!.next) {
      this.head = this.head!.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
  }

  cutTail() {
    let current = this.head;
    if (current) {
      while (current.next) {
        if (!current.next.next) {
          current.next = null;
        } else {
          current = current.next;
        }
      }
      this.tail = current;
      this.length--;
    }
  }

  insert(element: T, index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error("Индекс не существует");
    }
    if (index === 0) {
      this.prepend(element);
      return this;
    }
    const node = new Node(element);
    let current = this.head;
    let currentIndex = 0;
    while (current && currentIndex < index - 1) {
      currentIndex++;
      current = current.next;
    }
    if (current) {
      node.next = current.next;
      current.next = node;
    }
    this.length++;
    return this
  }

  delete(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error("Индекс не существует");
    }
    if (index === 0) {
      return this.cutHead();
    }
    if (index === this.length - 1) {
      return this.cutTail();
    }
    let prev = null;
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      if (curr) {
        prev = curr;
        curr = curr.next;
      }
    }
    if (prev && curr) {
      prev.next = curr.next;
    }
    this.length--;
  }

  toArray() {
    const array: Node<T>[] = [];
    let current = this.head;

    while (current) {
      array.push(current);
      current = current.next;
    }
    return array;
  }

  getLength() {
    return this.length;
  }
}
