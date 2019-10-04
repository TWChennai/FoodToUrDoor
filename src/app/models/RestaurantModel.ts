import { Deserializable } from './Deserializable.model';
import { ItemModel } from './itemmodel';

export class RestaurantModel implements Deserializable {

    public hotelId: string;
    public name: string;
    public items: ItemModel[];

    deserialize(input: any): this {
        Object.assign(this, input);
        this.items = input.items.map((item: ItemModel) => new ItemModel().deserialize(item));
        return this;
    }
}


