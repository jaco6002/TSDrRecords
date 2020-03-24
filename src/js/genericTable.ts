export function json2table100(json: any): string {
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

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}