import Axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

import {json2table100}from "./genericTable"

interface IRecord{
    id:number;
    title:string;
    artist:string;
    durationInSeconds:number;
    yearOfPublication:number;
}

let uri:string="https://drrecordsrest.azurewebsites.net/api/records";
let element: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let element2: HTMLDivElement = <HTMLDivElement> document.getElementById("content2")
let inputtitle: HTMLInputElement = <HTMLInputElement> document.getElementById("title")
let inputartist: HTMLInputElement = <HTMLInputElement> document.getElementById("artist")
let inputduration: HTMLInputElement = <HTMLInputElement> document.getElementById("duration")
let inputpublication: HTMLInputElement = <HTMLInputElement> document.getElementById("publication")
let buttonAdd: HTMLButtonElement=<HTMLButtonElement> document.getElementById("add")
buttonAdd.addEventListener("click",addNewRecord)
getAll();

function getAll():void{
Axios.get<IRecord[]>(uri)
.then(function (response: AxiosResponse<IRecord[]>): void {
    let data: IRecord[] = response.data;
    console.log(data);
    let result: string = json2table100(response.data);
    console.log(result);
    let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
    element.innerHTML = result;
})
.catch(function (error: AxiosError): void {
    console.log(JSON.stringify(error));
})
}

function addNewRecord():void{
    let tit:string =inputtitle.value;
    let art:string =inputartist.value;
    let duration:number =Number(inputduration.value);
    let publication:number =Number(inputpublication.value);

    
    Axios.post<IRecord>(uri,{title: tit, artist: art, durationInSeconds: duration, yearOfPublication: publication})
    .then((response: AxiosResponse) => {
        let message: string = "response " + response.status + " " + response.statusText;
        element2.innerHTML = message;
        console.log(message);
        getAll();
    })
    .catch((error: AxiosError) => {
        element2.innerHTML = error.message;
        console.log(error);
    })
}

