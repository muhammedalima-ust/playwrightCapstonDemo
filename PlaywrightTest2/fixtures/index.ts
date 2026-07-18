import { flightFlow } from '../flow/flightFlow';
import {test as base} from './EvidenceFixture'

type Fixtures={
    flightflow:flightFlow,
}

export const test = base.extend<Fixtures>({
    flightflow: async ({page},use)=>{
        await use (new flightFlow(page));
    },
})

export {expect} from '@playwright/test';