type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };

        node.next = this.head;
        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.length - 1) {
            this.append(item);
            return;
        }

        const node: Node<T> = { value: item };

        if (!this.head) {
            this.head = node;
        }

        const prevNode = this.getAt(idx - 1);

        if (prevNode) {
            prevNode.next = node;
            node.next = prevNode.next.next;
        }

        this.length++;
    }

    append(item: T): void {
        const lastNode = this.getAt(this.length - 1);
        const node: Node<T> = { value: item };

        if (!this.head) {
            this.head = node;
        }

        if (lastNode) {
            lastNode.next = node;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        let prev = undefined;
        let curr = this.head;

        while (curr) {
            if (curr.value === item) {
                if (prev) {
                    prev.next = curr.next;
                } else {
                    this.head = curr.next;
                }

                this.length--;
                return curr.value;
            }

            prev = curr;
            curr = curr.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            const head = this.head;
            this.head = this.head?.next;
            this.length--;
            return head?.value;
        }

        const prevNode = this.getAt(idx - 1);

        if (prevNode) {
            const curr = prevNode.next;
            prevNode.next = prevNode.next?.next;

            this.length--;
            return curr?.value;
        }

        return undefined;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        let i = 0;

        while (curr) {
            if (i === idx) return curr;
            curr = curr.next;
            i++;
        }

        return undefined;
    }
}
