import { Locator } from "@playwright/test";
import { Locators } from "../../locators/Locators";

export class ProductCard {

    constructor(
        private readonly productCard: Locator
    ) {}

    async getName(): Promise<string> {
        
        return (await Locators.PRODUCT_SKU(this.productCard).textContent())?.trim() ?? "";
    }

    async count(): Promise<number>{
        return await this.productCard.count();
    }
}