export class Product {
    description: string;
    attributes: object;

    constructor(response: any) {
        this.description = response.description;
        this.attributes = response.attributes;
    }
}