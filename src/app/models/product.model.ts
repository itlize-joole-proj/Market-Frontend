export class Product {
    productId: string;
    description: string;
    attributes: object;
    manufacturerId: string;
    saleId: number;
    subCategoryID: number;
    productId: number;

    constructor(response: any) {
        this.description = response.description;
        this.attributes = response.attributes;
        this.productId = response.productId;
    }
}
