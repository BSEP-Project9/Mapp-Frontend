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
    startOfEmpolment : Date ,
    role: Role
}
export interface Address {
    country : string,
    city : string,
    streetName : string,
    streetNumber : string
}
export interface Skills {
    name : string,
    rating : number
}

export interface UserDto {
    id : number,
    email : string,
    password : string,
    name : string,
    surname : string,
    phoneNumber : number,
    role : string,
    address : Address
}

export interface Role {
    name: string;
}