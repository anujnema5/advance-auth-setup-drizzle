import { Router } from "express";
import { getAllUsers, getProfiles, seedUsers, usersWithProfilesandPosts } from "../controllers/user.controllers";
import { postsWithCategory } from "../controllers/post.controllers";

const router = Router();

router.route('/posts-with-category').get(postsWithCategory);

export default router