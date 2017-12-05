import {Shop} from "../shop/shop.model";
export class City {

    public shops: Shop[];

    constructor(public id: number,
                public name: string,
                public x: number,
                public y: number,
                public country: string) {}

}
