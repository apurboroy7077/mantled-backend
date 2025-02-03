import express from 'express';
import { getCategoriesController } from '../controller/getCategories.controller';
import { addCategoryController } from '../../admin-v2/controller/addCategories.controller';

const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategoriesController);

export { categoriesRouter };
