import { Deserializable } from './Deserializable.model';

export class ItemModel implements Deserializable {
    public id: string;
    public itemName: string;
    public quantity: string;
    public price: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
