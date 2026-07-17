import { expect, Page } from "@playwright/test";

export class util {
    constructor(private readonly page:Page){};
    
    static emailName(name: string): string {
    return `${name.toLowerCase()}@shopkart.test`;
    }
}