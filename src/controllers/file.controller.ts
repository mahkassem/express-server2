import { Request, Response } from "express"
import path from "path"
import fs from "fs"

const getFileByName = async (req: Request, res: Response) => {
    const fileName = req.params.file_name
    const basePath = path.join(__dirname, "..", "..", "storage")

    try {
        const file = fs.readFileSync(`${basePath}/${fileName}`, "utf-8")
        res.send(file)
    } catch (error) {
        res.status(500).send("Internal server error")
        // log error for dev use
    }

    return
}

export { getFileByName }