import { Secrets } from "../src/utils/secrets";
import { Util } from "../src/utils/Util";

export const testUsers = {
    user:{
        email: Util.emailName("alice"),
        password: process.env.SHOPKART_ALICE_PASSWORD!,
        assress: "My Address is i WOnt Tell You"
    },
};