import { add } from "winston";
import { expect, test } from "../fixtures/index";
import { secrets } from "../src/util/secret";
import { util } from "../src/util/utils";
import { searchData } from "../testData/searchData";
import { testUsers } from "../testData/testUser";

test.describe("Book and Cancel teh flight",()=>{
    test("Booking a flight from DEL to JAI",async ({flightflow,log,evidence})=>{

        log.info("User Trying to open the website")
        await flightflow.openWebsite();
        log.info("User Open the website")


        log.info("User Click on the login Button")
        await flightflow.openLogin();
        expect(await flightflow.getUrl()).toContain(`/login`);
        log.info("Login Page Loaded : Verified");


        const email = util.emailName(`${testUsers.user.name}`);
        const password = secrets.getuserPassword(`${testUsers.user.name}`);

        await flightflow.login(email,password);
        log.info("The User Logined",{
        username:email,
        password:password
        });
        evidence['User Login Credentials'] = {
        username:email,
        password:password,
        status: "User Logged Sucessfully"
        }

        const fromLocation = searchData.search.from;
        const toLocation = searchData.search.to;
        const addOnDate = util.dateAdder(Number(searchData.search.dateAdd));

        log.info("User Try to Search For Flight");
        await flightflow.searchFlight(fromLocation,toLocation,addOnDate);
        log.info("User got result for :",{
        toLocation:toLocation,
        fromLocation:fromLocation,
        Date:addOnDate
        });

        evidence['Searched Datas'] = {
        toLocation:toLocation,
        fromLocation:fromLocation,
        Date:addOnDate
        }

        log.info("User Try Book first Flight Showing");
        await flightflow.clickFirstFlight();
        log.info("User Selected the first Flight");

        log.info("User is trying to select First available seat");
        await flightflow.selectSeatAndClickContinue();
        log.info("User Selected first seat and reached Payment Page");

        const firstName = testUsers.user.name;
        const secondName = testUsers.user.lastName;
        const age = testUsers.user.age;
        const phoneNumber =secrets.get(`${testUsers.user.name}_PHONE_NUMBER`);

        log.info("User adding passenger details")
        await flightflow.fillPassengerDetails(firstName,secondName,age,email,phoneNumber);
        log.info("User details",{
            UserFirstName:firstName,
            UserSecondName:secondName,
            UserAge:age,
            UserNumber:phoneNumber,
        })

        evidence['User Details'] = {
        toLocation:toLocation,
        fromLocation:fromLocation,
        Date:addOnDate
        }

        const nameOnCard = secrets.get(`${testUsers.user.name}_CARD_NAME`);
        const cardNumber = secrets.get(`${testUsers.user.name}_CARD_NUMBER`);
        const cardExpiry = secrets.get(`${testUsers.user.name}_CARD_EXPIRY`);
        const CVV =  secrets.get(`${testUsers.user.name}_CARD_CVV`);

        log.info("User is trying to add payment")
        await flightflow.addPaymentDetails(nameOnCard,cardNumber,cardExpiry,CVV);
        log.info("Payment Card Details",{
            NameOnCard:nameOnCard,
            CardNumber:cardNumber,
            CardExpiry:cardExpiry,
            CVV:CVV,
        })

        evidence['User Details'] = {
        NameOnCard:nameOnCard,
            CardNumber:cardNumber,
            CardExpiry:cardExpiry,
            CVV:CVV,
        }


        await flightflow.conformationPageVisible();
        log.info("The User reached the conformation page");

        const pnr = await flightflow.getPNR();
        log.info("PNR Number :",{PNR:pnr})

        await flightflow.gotoTripHistory();
        log.info('User Reached trip history');

        var status = await flightflow.statusofPNRpassedtrip(pnr!);
        expect(status).toEqual("CONFIRMED");
        log.info("Status of the flight book Before Cancelation",{status:status})

        await flightflow.cancelLastTrip();
        log.info('User Cancelled Last trip');

        status = await flightflow.statusofPNRpassedtrip(pnr!);
        expect(status).toEqual("REFUNDED");
        log.info("Status of the flight book After Cancelation",{status:status})
        
    })
})