import express from 'express';
import { getAssignedCollaboratorDataController } from '../controller/getAssignedCollaboratorData.controller';
import { getDataOfAssetController } from '../controller/getDataOfAssets.controller';
import { getDetailsOfSingleAssetController } from '../controller/getDetailsOfSingleAsset.controller';
import { getSingleCollaboratorDataAndAssetsAssignedToHimController } from '../controller/getSingleCollaboratorDataAndAssetsAssignedToHim.controller';
import { getDataOfInvitationSentToCollaboratorController } from '../controller/getDataOfInvitationSentToCollaborator.controller';
import { getOwnDataOfUserController } from '../controller/getOwnDataOfUser.controller';
import { getListOfAllTheClientsOfACollaboratorController } from '../controller/getListOfAllTheClientsOfACollaborator.controller';
import { getListOfAllTheAssetsAssignedToCollaboratorController } from '../controller/getListOfAllTheAssetsAssignedToCollaborator.controller';
import { getDataOfClientsAndAssignedAssetsOfACollaboratorController } from '../controller/getDataOfClientsAndAssignedAssetsOfACollaborator.controller';
import { getDataOfPendingAssetsOfCollaboratorController } from '../controller/getDataOfPendingAssetsOfCollaborator.controller';

const vaultRouter = express.Router();

vaultRouter.get(
  '/get-assigned-collaborator-data',
  getAssignedCollaboratorDataController
);
vaultRouter.get('/asset', getDataOfAssetController);
vaultRouter.get('/single-asset-details', getDetailsOfSingleAssetController);
vaultRouter.get(
  '/single-collaborator-and-asset-assigned-to-that-collaborator',
  getSingleCollaboratorDataAndAssetsAssignedToHimController
);
vaultRouter.get(
  '/get-data-of-invitations-sent-to-collaborators',
  getDataOfInvitationSentToCollaboratorController
);
vaultRouter.get('/get-own-data-of-user', getOwnDataOfUserController);
vaultRouter.get(
  '/get-list-of-all-the-clients-of-a-collaborator',
  getListOfAllTheClientsOfACollaboratorController
);

vaultRouter.get(
  '/get-list-of-all-the-assets-assigned-to-collaborator',
  getListOfAllTheAssetsAssignedToCollaboratorController
);
vaultRouter.get(
  '/get-data-of-clients-and-assigned-assets-of-a-collaborator',
  getDataOfClientsAndAssignedAssetsOfACollaboratorController
);
vaultRouter.get(
  '/get-data-of-pending-assets-of-collaborator',
  getDataOfPendingAssetsOfCollaboratorController
);

export { vaultRouter };
