export class util {

    static emailName(name: string): string {
    return `${name.toLowerCase()}@tripstack.test`;
    }

    static dateAdder(addOn:number){
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + addOn);
        return futureDate.toISOString().split("T")[0];
    }

}