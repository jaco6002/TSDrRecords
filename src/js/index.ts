import Axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

interface IRecord{
    id:number;
    title:string;
    artist:string;
    durationInSeconds:number;
    yearOfPublication:number;
}
let uri:string="https://drrecordsrest.azurewebsites.net/api/records";
let element: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
getAll();

function getAll():void{
Axios.get<IRecord[]>(uri)
/* .then(function (response:AxiosResponse<IRecord[]>):void{
    let result: string = "<ul id=booklist>";
    response.data.forEach((book:IRecord)=>{
        result+="<li>"+book.id+" "+book.title+" "+book.artist+" "+book.durationInSeconds+" "+book.yearOfPublication+"</li>";
    });
    result += "</ul>"
    element.innerHTML=result;
})
.catch(function (error: AxiosError): void { 
    if (error.response) {
        element.innerHTML = error.message;
    } else { 
        element.innerHTML = error.message;
    }
}) */
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

function json2table100(json: any): string {
    let cols: string[] = Object.keys(json[0]);
    let headerRow: string = "";
    let bodyRows: string = "";
    cols.forEach((colName: string) => {
        headerRow += "<th>" + capitalizeFirstLetter(colName) + "</th>"
    });
    json.forEach((row: any) => {
        bodyRows += "<tr>";
        // loop over object properties and create cells
        cols.forEach((colName: string) => {
            bodyRows += "<td>" + (typeof row[colName] === "object" ? JSON.stringify(row[colName]) : row[colName]) + "</td>";
        });
        bodyRows += "</tr>";
    });
    return "<table><thead><tr>" +
        headerRow +
        "</tr></thead><tbody>" +
        bodyRows +
        "</tbody></table>";
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}