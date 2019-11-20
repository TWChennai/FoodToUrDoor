export class OrderItem {
    itemId: string;
    itemName: string;
    qty: string;
    price: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
