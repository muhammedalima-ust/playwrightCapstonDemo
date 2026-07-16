import { APIRequestContext } from "@playwright/test";

export class ProductClient {
    constructor(private readonly request:APIRequestContext) {}
    async getProducts(product:string){
        const response = await this.request.get('/api/products',{
            params:{
                q:product,
            }
        });
        return response;
    }
 
}