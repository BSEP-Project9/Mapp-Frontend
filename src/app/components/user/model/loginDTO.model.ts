export interface Credentials{
    "email":string,
    "password":string
}

export interface UserTokenState{
    "accessToken":string,
    "refreshToken":string,
}

export interface LoggedUser{
    "id": string,
    "role": string
}