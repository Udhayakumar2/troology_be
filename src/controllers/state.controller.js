import { stateSchema } from '../validator/validation.js';
import { addState, stateDetail, getStatesById, updateState, deleteState } from '../services/state.service.js';

export const state = async (req, res) => {
    try {
        await stateSchema.validateAsync(req.body);
        const state = await addState(req.body);
        return res.status(state.statusCode).send(state);
    } catch (error) {
        console.log("Error in Add State API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
}

export const stateDetails = async (req, res) => {
    try {
        const state = await stateDetail();
        return res.status(state.statusCode).send(state);
    } catch (error) {
        console.log("Error in Get State API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const getStateById = async (req, res) => {
    try {
        const state = await getStatesById(req.query);
        return res.status(state.statusCode).send(state);

    } catch (error) {
        console.log("Error in Get State By ID API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const updateStateById = async (req, res) => {
    try {
        await stateSchema.validateAsync(req.body);
        const state = await updateState(req.body, req.query);
        return res.status(state.statusCode).send(state);
    } catch (error) {
        console.log("Error in updating state API: ", error);
        return res.status(400).send({ statusCode: 400, status: "failed", message: error.message });
    }
};

export const deleteStateById = async (req, res) => {
    try {
        const state = await deleteState(req.body);
        return res.status(state.statusCode).send(state);

    } catch (error) {
        console.log("Error in Deleting State API: ", error);
        return res.status(500).send({ statusCode: 500, status: failed, message: error.message });
    }
};