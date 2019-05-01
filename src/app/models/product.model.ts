export class Product {
    description: string;
    attributes: object;
    productId: number;

    constructor(response: any) {
        this.description = response.description;
        this.attributes = response.attributes;
        this.productId = response.productId;
    }
}