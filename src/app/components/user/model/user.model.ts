export interface User{
    id : number,
    email : string,
    password : string,
    name : string,
    surname : string,
    phoneNumber : string,
    isActivated : boolean,
    address : Address,
    skills : Skills[],
   // projects : Contribution[],
    startOfEmpolment : Date 
}
export interface Address {
    country : String,
    city : String,
    streetName : String,
    streetNumber : String
}
export interface Skills {
    name : string,
    rating : number
}