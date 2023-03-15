import express from 'express'
import { state, stateDetails, getStateById, updateStateById, deleteStateById } from "../controllers/state.controller.js";
import { district, districtDetails, getdistrictById, updateDistrictById, deleteDistrictById, getdistrictByStateId } from "../controllers/district.controller.js";
import { block, blockDetails, deleteBlockById, getBlockByDistrictId, getBlockById, updateBlockById } from '../controllers/block.controller.js';
import { deleteVillageById, getVillageById, updateVillageById, village, villageDetails } from '../controllers/village.controller.js';

const router = express.Router();

/*Routing for State */
router.post('/state', state);
router.get('/state', stateDetails);
router.get('/stateById', getStateById);
router.put('/stateById', updateStateById);
router.delete('/stateById', deleteStateById);

/*Routing for District */
router.post('/district', district);
router.get('/district', districtDetails);
router.get('/districtById', getdistrictById);
router.get('/districtByStateId', getdistrictByStateId);
router.put('/districtById', updateDistrictById);
router.delete('/districtById', deleteDistrictById);

/*Routing for Block */
router.post('/block', block);
router.get('/block', blockDetails);
router.get('/blockById', getBlockById);
router.get('/blockByDistrictId', getBlockByDistrictId);
router.put('/blockById', updateBlockById);
router.delete('/blockById', deleteBlockById);

/*Routing for Villge */
router.post('/village', village);
router.get('/village', villageDetails );
router.get('/villageById', getVillageById);
router.put('/villageById', updateVillageById);
router.delete('/villageById', deleteVillageById);

export default router;