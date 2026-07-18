import { Locator, Page } from "@playwright/test";

export class xpLocators {
    private constructor() {}
    
     static SELECTDATE(page:Page):Locator{
     return  page.locator("#home-date");  
    }
    static FIRSTSEAT(page:Page):Locator{
        return page.locator("//*[@class='seat available']");
    }
    static PNRNUMBER(page:Page):Locator{
    return page.locator('[data-id="pnr"]');
  }
  
    
    static TRIPCARDUSINGPNR(page: Page, pnr: string): Locator {
        return page.locator(
            `//div[contains(@class,'result')]
             [.//*[@data-id='pnr' and contains(text(),'${pnr}')]]`
        );
    }

    static STATUS(locator: Locator): Locator {
    return locator.locator("xpath=.//*[@data-id='state']");
    }



}
