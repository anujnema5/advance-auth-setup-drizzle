import { Request, Response } from "express"
import { db } from "../db"
import { users } from "../db/schema"

export const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await db.select().from(users)
    return res.status(200).json(allUsers)
}