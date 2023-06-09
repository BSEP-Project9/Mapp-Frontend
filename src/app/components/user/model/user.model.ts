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
    role: Role,
    blocked: boolean
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
    address : Address,
    skills : Skills[]
}

export interface Role {
    name: string;
}

export interface AdminDTO {
    email : string,
    password : string,
    name : string,
    surname : string,
    phoneNumber : number,
    address : Address
}