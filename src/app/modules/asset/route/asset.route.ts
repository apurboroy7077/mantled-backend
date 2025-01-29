import express from 'express';
import { createAssetController } from '../controller/createAsset.controller';

const assetRoutes = express.Router();

assetRoutes.post('/create', createAssetController);

export { assetRoutes };
