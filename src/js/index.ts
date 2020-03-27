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
let addStatusCode: HTMLSpanElement = <HTMLSpanElement> document.getElementById("statusCode")
let deleteStatusCode: HTMLSpanElement = <HTMLSpanElement> document.getElementById("statusCodeDelete")
let putStatusCode: HTMLSpanElement = <HTMLSpanElement> document.getElementById("statusCodePut")
let buttonAdd: HTMLButtonElement=<HTMLButtonElement> document.getElementById("add")
buttonAdd.addEventListener("click",addNewRecord)

let searchOptions: HTMLSelectElement = <HTMLSelectElement> document.getElementById("searchOptions")
let searchText: HTMLInputElement = <HTMLInputElement> document.getElementById("searchText")
let buttonSearch: HTMLButtonElement=<HTMLButtonElement> document.getElementById("searchButton")
    buttonSearch.addEventListener("click", searchBy)
let buttonReset: HTMLButtonElement=<HTMLButtonElement> document.getElementById("reset")
    buttonReset.addEventListener("click", getAll)

let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton")
    deleteButton.addEventListener("click", deleteRecord)

let putButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("putButton")
    putButton.addEventListener("click", edit)


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

function edit(): void {
    let putTitleElement: HTMLInputElement = <HTMLInputElement>document.getElementById("putTitle") 
    let putArtistElement: HTMLInputElement = <HTMLInputElement>document.getElementById("putArtist") 
    let putIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("putId") 
    let putDurationElement: HTMLInputElement = <HTMLInputElement>document.getElementById("putDuration") 
    let putYearElement: HTMLInputElement = <HTMLInputElement>document.getElementById("putPublication") 

    let pTitle: string = putTitleElement.value;
    let pArtist: string = putArtistElement.value;
    let pId: number = Number(putIdElement.value);
    let pDuration: number = Number(putDurationElement.value);
    let pYear: number = Number(putYearElement.value);

    Axios.put<IRecord>(uri + "/" + pId, {title: pTitle, artist: pArtist, durationInSeconds: pDuration, yearOfPublication: pYear})
    .then((response: AxiosResponse) => {
        let message: string = "response " + response.status + " " + response.statusText;
        putStatusCode.innerHTML = message;
        console.log(message);
        getAll();
    })
    .catch((error: AxiosError) => {
        putStatusCode.innerHTML = error.message;
        console.log(error);
    })
}

function deleteRecord(): void{
    let deleteIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteId")
    let deleteId:number = Number(deleteIdElement.value)
    Axios.delete<IRecord>(uri + "/" + deleteId)
    .then(function (response: AxiosResponse<IRecord>): void {
        let message: string = "response " + response.status + " " + response.statusText;
        deleteStatusCode.innerHTML = message;
        console.log(message);
        getAll();
    })
    .catch(function (error: AxiosError): void {
        deleteStatusCode.innerHTML = error.message;
        console.log(error);
    })
}

function searchBy(): void{
    Axios.get<IRecord[]>(uri + "/search/" + searchOptions.value + "/" + searchText.value)
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
        addStatusCode.innerHTML = message;
        console.log(message);
        getAll();
    })
    .catch((error: AxiosError) => {
        addStatusCode.innerHTML = error.message;
        console.log(error);
    })
}

