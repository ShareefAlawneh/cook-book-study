class Stack<T> implements IStack<T>{
    private data: T[];

    constructor() {
        this.data = [];
    }
    public push(...values: T[]): void {
        for (let value of values)
            this.data[this.data.length] = value;
    }

    public pop(): T {
        let top = this.top();
        this.data.length -= 1;
        return top;
    }


    public top(): T {
        return this.data[this.data.length - 1];
    }

    public isEmpty() {
        return this.data.length == 0;

    }

    public size() {
        return this.data.length
    }

}

export { Stack };