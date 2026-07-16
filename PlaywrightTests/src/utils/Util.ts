import { expect, Page } from "@playwright/test";

export class Util {
    constructor(private readonly page:Page){};

    async checkUrl(url:string){
        await expect(this.page).toHaveURL(url);
    }

    static emailName(name: string): string {
    return `${name}@shopkart.test`;
    }
}