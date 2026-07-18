import {test as base} from './EvidenceFixture'
import { FullFlow } from '../flow/FullFlow'
import { util } from '../src/utils/util';

type Fixtures={
    flow:FullFlow,
    util:util;
}

export const test = base.extend<Fixtures>({
    flow: async ({page},use,testInfo)=>{
        await use (new FullFlow(page,testInfo));
    },

    util: async ({page},use)=>{
        await use (new util(page));
    }
})

export {expect} from '@playwright/test';