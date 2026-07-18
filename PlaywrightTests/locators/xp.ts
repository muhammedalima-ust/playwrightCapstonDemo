import { Locator, Page } from "@playwright/test";

export class xp {
    private constructor() {}
    
    static LOGINBUTTON(page:Page):Locator{
        return page.locator(".pill-login");
    }

    static LOCATION_SELECTOR(locator:Locator,value:string):Locator{
        return locator.locator(`[data-code='${value}']`);
    }
     static SELECTDATE(page:Page):Locator{
     return  page.locator("#home-date");  
  }

  static AVAIALBLESLEEPERSEAT(page:Page):Locator{
   return page.locator('[data-deck="upper"][data-kind="sleeper"][data-state="available"]');
  }

  static PNRNUMBER(page:Page):Locator{
    return page.locator('div.pnr[data-id="pnr"]');
  }
}
