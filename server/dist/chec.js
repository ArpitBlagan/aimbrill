"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const ff = () => __awaiter(void 0, void 0, void 0, function* () {
    const workbook = xlsx_1.default.readFile("src/csv.csv");
    const sheetNames = workbook.SheetNames;
    const jsonDataArray = [];
    for (const sheetName of sheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx_1.default.utils.sheet_to_json(sheet);
        jsonDataArray.push({ sheetName, jsonData });
    }
    console.log(jsonDataArray.length, jsonDataArray[0]);
});
ff();
