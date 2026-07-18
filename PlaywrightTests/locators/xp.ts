import { Locator, Page } from "@playwright/test";

export class xp {
    private constructor() {}
    
     static SELECTDATE(page:Page):Locator{
     return  page.locator("#home-date");  
    }

  static AVAIALBLESLEEPERSEATUPPER(page:Page):Locator{
   return page.locator('[data-deck="upper"][data-kind="sleeper"][data-state="available"]');
  }
  static AVAIALBLESLEEPERSEATLOWER(page:Page):Locator{
   return page.locator('[data-deck="lower"][data-kind="sleeper"][data-state="available"]');
  }

  static PNRNUMBER(page:Page):Locator{
    return page.locator('div.pnr[data-id="pnr"]');
  }
}
