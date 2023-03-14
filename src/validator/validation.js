import joi from 'joi'

export const stateSchema = joi.object({
    state_code: joi.string().required(),
    state_name: joi.string().required()
});

export const districtSchema = joi.object({
    district_code: joi.string().required(),
    district_name: joi.string().required(),
    state_id: joi.string().required()
});

export const blockSchema = joi.object({
    block_code: joi.string().required(),
    block_name: joi.string().required(),
    district_id: joi.string().required(),
    state_id: joi.string().required()
});

export const villageSchema = joi.object({
    village_code: joi.string().required(),
    village_name: joi.string().required(),
    district_id: joi.string().required(),
    block_id: joi.string().required(),
    state_id: joi.string().required()
});


