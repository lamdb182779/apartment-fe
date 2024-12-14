import { AuthError } from "next-auth";


export class CustomAuthError extends AuthError {

    constructor(message?: any) {
        super()
        this.type = message
    }
}