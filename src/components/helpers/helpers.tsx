export const csvToArray = (str: string, delimiter: string) => {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const array = rows.map(row => {
       const values = row.split(delimiter) ;
       const elements = headers.reduce((object, header, index) => {
           object[header] = values[index];
           return object;
       }, {});
       return elements;
    });

    return array;
}