import multer from "multer";
import path from "node:path";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (
        req: Request, file: Express.Multer.File, cb: (error : Error | null, destination: string) => void
    ) => { cb(null, "uploads/")},

    filename: (
        req: Request, file: Express.Multer.File, cb: (error : Error | null, destination: string) => void
    ) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}-${Math.random()}${ext}`)
    }
})

export const upload = multer({storage})