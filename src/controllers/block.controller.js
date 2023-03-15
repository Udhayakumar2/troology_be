import { blockSchema } from '../validator/validation.js';
import { addBlock, blockDetail, getBlocksById, updateBlock, deleteBlock, getblockByDistrictId } from '../services/block.service.js';

export const block = async (req, res) => {
    try {
        await blockSchema.validateAsync(req.body);
        const block = await addBlock(req.body);
        return res.status(200).send(block);
    } catch (error) {
        console.log("Error in add Block API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
}

export const blockDetails = async (req, res) => {
    try {
        const block = await blockDetail();
        return res.status(200).send(block);
    } catch (error) {
        console.log("Error in Get Block Details API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const getBlockById = async (req, res) => {
    try {
        const block = await getBlocksById(req.query);
        return res.status(200).send(block);

    } catch (error) {
        console.log("Error in Get Block By ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const updateBlockById = async (req, res) => {
    try {
        await blockSchema.validateAsync(req.body);
        const block = await updateBlock(req.body, req.query);
        return res.status(200).send(block);
    } catch (error) {
        console.log("Error in Adding Shop Details API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const deleteBlockById = async (req, res) => {
    try {
        const block = await deleteBlock(req.query);
        return res.status(200).send(block);

    } catch (error) {
        console.log("Error in District API: ", error);
        return res.status(500).send({ statusCode: 500, status: failed, message: error.message });
    }
};

export const getBlockByDistrictId = async (req, res) => {
    try {
        const block = await getblockByDistrictId(req.query);
        return res.status(200).send(block);

    } catch (error) {
        console.log("Error in Get BLock By  District ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};