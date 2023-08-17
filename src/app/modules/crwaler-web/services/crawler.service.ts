import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrawlerService {

  constructor(private httpClient:HttpClient) { }
  search(url: string,deep:number) {
 let htmlString =this.getHtmlFromUrl(url).subscribe(s=>{
  let documentFragment = new DOMParser().parseFromString(s, "text/html");
  console.log(documentFragment);
  //let buttons = documentFragment.getElementsByTagName('button');
 });

  }
  getHtmlFromUrl(url:string):Observable<any>{

   return this.httpClient.get(url,{ responseType: "text" })
  }
}
