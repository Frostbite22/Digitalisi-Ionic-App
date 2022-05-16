export interface Login 
{
    username : string;
    password : string;
}

export class Login 
{
    username : string;
    password : string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
      }
    
}