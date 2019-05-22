export interface User {
    username?: string,
    email?: string,
    password?: string,
    uid?: string,
    etat?: etat
}




interface etat{
    isAdmin?:boolean,
    isCl?: boolean,
    isTech?:boolean
}