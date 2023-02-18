import express from 'express'

import { getCategories, addCategory,getCategory,deleteCategory,updateCategory } from "../controller/category.controller";

const router = express.Router();

router.get('/get-categories',getCategories)
router.get('/get-categories/:category_id',getCategory)
router.post('/add-category',addCategory)
router.delete('/delete-category/:category_id',deleteCategory)
router.patch('/update-category/:category_id',updateCategory)

export default router;

