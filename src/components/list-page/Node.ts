interface INode<T> {
  value: T;
  next: INode<T> | null;
  tryHead: T | null;
  tryTail: T | null;
}

export class Node<T> implements INode<T> {
  value: T
  next: Node<T> | null
  tryHead: T | null
  tryTail: T | null

  constructor(value: T, next?: Node<T> | null, tryHead?: T | null, tryTail?: T | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
    this.tryHead = (tryHead === undefined ? null : tryHead);
    this.tryTail = (tryTail === undefined ? null : tryTail);
  }
}
