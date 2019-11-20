import { OrderItem } from './orderitem';

export class Ordermodel {
    orderId: string;
    restaurantId: string;
    restaurantName: string;
    orderItems: OrderItem[];
    tax: string;
    deliveryFee: string;
    totalValue: string;
    orderTime: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.orderItems = input.orderItems.map((orderItem: OrderItem) => new OrderItem().deserialize(orderItem));
        return this;
    }
}
