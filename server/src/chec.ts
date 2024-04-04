import xlsx from "xlsx";
const ff = async () => {
  const workbook = xlsx.readFile("src/csv.csv");
  const sheetNames = workbook.SheetNames;
  const jsonDataArray = [];

  for (const sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    jsonDataArray.push({ sheetName, jsonData });
  }
  console.log(jsonDataArray.length, jsonDataArray[0]);
};
ff();
