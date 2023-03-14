import { districtSchema } from '../validator/validation.js';
import { addDistrict, districtDetail, getdistrictsById, updateDistrict, deleteDistrict, getDistrictsByStateId } from '../services/district.service.js';

export const district = async (req, res) => {
    try {
        await districtSchema.validateAsync(req.body);
        const district = await addDistrict(req.body);
        return res.status(district.statusCode).send(district);
    } catch (error) {
        console.log("Error in Add District API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
}

export const districtDetails = async (req, res) => {
    try {
        const district = await districtDetail();
        return res.status(district.statusCode).send(district);
    } catch (error) {
        console.log("Error in Get District Details API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const getdistrictById = async (req, res) => {
    try {
        const district = await getdistrictsById(req.query);
        return res.status(district.statusCode).send(district);

    } catch (error) {
        console.log("Error in Get District By ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const updateDistrictById = async (req, res) => {
    try {
        await districtSchema.validateAsync(req.body);
        const district = await updateDistrict(req.body, req.query);
        return res.status(district.statusCode).send(district);
    } catch (error) {
        console.log("Error in Update District API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const deleteDistrictById = async (req, res) => {
    try {
        const district = await deleteDistrict(req.query);
        return res.status(district.statusCode).send(district);

    } catch (error) {
        console.log("Error in  delete District API: ", error);
        return res.status(500).send({ statusCode: 500, status: failed, message: error.message });
    }
};

export const getdistrictByStateId = async (req, res) => {
    try {
        const district = await getDistrictsByStateId(req.query);
        return res.status(district.statusCode).send(district);

    } catch (error) {
        console.log("Error in Get District By ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};