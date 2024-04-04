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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/upload");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
}));
app.post("/add/file", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: "no file is there" });
    }
    try {
        const workbook = xlsx_1.default.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx_1.default.utils.sheet_to_json(sheet);
        console.log(jsonData);
        const ress = yield prisma.table.create({
            data: {
                meta: req.file.originalname,
                data: JSON.stringify(jsonData),
                createdAt: new Date(),
            },
        });
        console.log(ress);
        fs_1.default.unlinkSync(req.file.path);
        res.status(200).json(ress);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file!" });
    }
}));
app.get("/file", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.table.findMany({});
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
}));
app.delete(":id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma.table.delete({
            where: {
                id: id,
            },
        });
        console.log(data);
        res.status(202).json({ message: "Deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
