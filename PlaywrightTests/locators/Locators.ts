import { Locator, Page } from "@playwright/test";

export class Locators {
    private constructor() {}
    
    static SIGNIN(page:Page):Locator{
        return page.getByRole('button',{name: /Sign in/i });
    }

    static SEARCH_INPUT(page:Page):Locator{
        return page.getByRole('searchbox', { name: 'Search products' });
    }

    static SEARCH_BUTTON(page:Page):Locator{
        return page.getByRole('button', { name: 'Search' });
    }

    static INPUT_FORM(page:Page):Locator{
        return page.getByLabel('ShopKart sign in');
    }

    static PRODUCT_CARDS(page:Page):Locator{
        return page.getByRole('article',{includeHidden:false});
    }

    static PRODUCT_SKU(locator:Locator){
        return locator.getByRole('heading',{level:2});
    }

    static PRODUCT_BUTTON(locator:Locator,name:string){
        return locator.locator(`//button[contains(@class,'product-image') and contains(.,${name})]`);
    }

    static ADD_TO_CART_BUTTON(page:Page){
        return page.getByRole('button', { name: 'Add to cart' });
    }

    static CHECKOUT_BUTTON(page:Page){
        return page.getByRole('button', { name: 'Checkout' })
    }

    static ADDRESS_INPUT(page:Page){
        return page.getByLabel('Delivery address')
    }

    static PLACE_ORDER_BUTTON(page:Page){
        return page.getByRole('button', { name: /PLACE ORDER/i })
    }
}