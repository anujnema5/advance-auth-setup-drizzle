import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers";

const router = Router();

router.route('/getusers').get(getAllUsers)

export default router