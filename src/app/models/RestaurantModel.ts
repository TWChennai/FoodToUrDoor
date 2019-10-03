import { Deserializable } from './Deserializable.model';
import { ItemModel } from './itemmodel';

export class RestaurantModel implements Deserializable {

    public hotelId: string;
    public name: string;
    public items: ItemModel[];

    deserialize(input: any): this {
        console.log('in RestaurantModel');
        Object.assign(this, input);
        this.items = input.items.map((item: ItemModel) => new ItemModel().deserialize(item));
        console.log(this.hotelId);
        console.log(this.name);
        console.log(this.items);
        return this;
    }
}


