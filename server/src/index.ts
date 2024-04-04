import express, { Response, Request } from "express";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
dotenv.config();
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.post(
  "/add/file",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "no file is there" });
    }
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      console.log(jsonData);
      const ress = await prisma.table.create({
        data: {
          meta: req.file.originalname,
          data: JSON.stringify(jsonData),
          createdAt: new Date(),
        },
      });
      console.log(ress);
      fs.unlinkSync(req.file.path);
      res.status(200).json(ress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading file!" });
    }
  }
);
app.get("/file", async (req: Request, res: Response) => {
  try {
    const data = await prisma.table.findMany({});
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
});

app.delete(":id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.table.delete({
      where: {
        id: id,
      },
    });
    console.log(data);
    res.status(202).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
