import { HttpClient,HttpHeaders } from '@angular/common/http';


export class Header {

    public static getHeaders(key : string)
    {
        const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json',
        Authorization: `Basic ${key}`,
        'Access-Control-Allow-Origin': '*',
        })};
        return httpOptions ;
    
    }
 }