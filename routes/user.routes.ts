import { Router } from "express";
import { createManyToMany, createOneToMany, createOnetoOne, createUser, getAllUsers, getProfiles, seedUsers, usersWithProfilesandPosts } from "../controllers/user.controllers";

const router = Router();

router.route('/getusers').get(getAllUsers)
router.route('/seeddata').get(seedUsers)
router.route('/users-with-profile-posts').get(usersWithProfilesandPosts)
router.route('/profiles').get(getProfiles)
router.route('/create').post(createUser)
router.route('/create/one-to-one').post(createOnetoOne)
router.route('/create/one-to-many').post(createOneToMany)
router.route('/create/many-to-many').post(createManyToMany)

export default router