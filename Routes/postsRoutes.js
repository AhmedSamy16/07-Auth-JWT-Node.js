import express from "express"
import { getAllPosts, createPost, getPostBtId, updatePost, deletePost } from "../Controllers/postsController.js"
import { protectRoutes } from "../Controllers/userController.js"

const router = express.Router()

router.route('/')
    .get(protectRoutes, getAllPosts)
    .post(protectRoutes, createPost)

router.route('/:id')
    .get(protectRoutes, getPostBtId)
    .patch(protectRoutes, updatePost)
    .delete(protectRoutes, deletePost)

export default router