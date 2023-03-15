import { villageSchema } from '../validator/validation.js';
import { addVillage, deleteVillage, getvillagesById, updateVillage, villageDetail } from '../services/village.service.js';

export const village = async (req, res) => {
    try {
        await villageSchema.validateAsync(req.body);
        const village = await addVillage(req.body);
        return res.status(200).send(village);
    } catch (error) {
        console.log("Error in add Village API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
}

export const villageDetails = async (req, res) => {
    try {
        const village = await villageDetail();
        return res.status(200).send(village);
    } catch (error) {
        console.log("Error in Get Village Details API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const getVillageById = async (req, res) => {
    try {
        const village = await getvillagesById(req.query);
        return res.status(200).send(village);

    } catch (error) {
        console.log("Error in Get Product By ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const updateVillageById = async (req, res) => {
    try {
        await villageSchema.validateAsync(req.body);
        const village = await updateVillage(req.body, req.query);
        return res.status(200).send(village);
    } catch (error) {
        console.log("Error in Adding Shop Details API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const deleteVillageById = async (req, res) => {
    try {
        const village = await deleteVillage(req.query);
        return res.status(200).send(village);
    } catch (error) {
        console.log("Error in District API: ", error);
        return res.status(500).send({ statusCode: 500, status: failed, message: error.message });
    }
};