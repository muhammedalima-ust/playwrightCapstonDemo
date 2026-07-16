import {test as base} from './EvidenceFixture'
import { SearchFlow } from '../flow/SearchFlow'
import { Util } from '../src/utils/Util';

type Fixtures={
    search:SearchFlow,
    util:Util;
}

export const test = base.extend<Fixtures>({
    search: async ({page,request},use,testInfo)=>{
        await use (new SearchFlow(page,request,testInfo));
    },

    util: async ({page},use)=>{
        await use (new Util(page));
    }
})

export {expect} from '@playwright/test';