interface IStack<T> {
    push(value: T): void;
    pop(): T;
    top(): T;
    isEmpty(): boolean;
    size(): number;

}