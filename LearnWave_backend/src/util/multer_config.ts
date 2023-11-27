import express from "express";
import { Request, Response } from "express";
import multer, { diskStorage, StorageEngine } from 'multer';
const storage: StorageEngine = diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) {
        return cb(null, "public/upload");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});
// const upload = multer({ storage: storage })
// export default upload;
export const uploadFile = multer({ storage: storage });
