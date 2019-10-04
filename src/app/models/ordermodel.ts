import { OrderItem } from './orderitem';

export class Ordermodel {
    restaurantId: string;
    restaurantName: string;
    orderItems: OrderItem[];
    tax: string;
    deliveryFee: string;
    totalValue: string;
}
