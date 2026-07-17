import {test as base} from './EvidenceFixture'
import { SearchFlow } from '../flow/SearchFlow'
import { util } from '../src/utils/util';

type Fixtures={
    search:SearchFlow,
    util:util;
}

export const test = base.extend<Fixtures>({
    search: async ({page,request},use,testInfo)=>{
        await use (new SearchFlow(page,request,testInfo));
    },

    util: async ({page},use)=>{
        await use (new util(page));
    }
})

export {expect} from '@playwright/test';