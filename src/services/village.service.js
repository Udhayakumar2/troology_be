import { Villages } from '../models/village.models.js'
import mongo from 'mongodb';
const { ObjectId } = mongo;

/* Add the Villages */
export const addVillage = async (villageValue) => {
    try {
        const village = await Villages.findOne({ village_code: villageValue.village_code.trim(), status: true });
        if (village) {
            return {
                statusCode: 400,
                status: "Village Code already Exists",
                message: "Village Code already Exists"
            };
        }
        const { district_id, village_code, block_id, village_name, state_id } = villageValue;
        const newCode = new Villages({ district_id, village_code, block_id, village_name, state_id });
        await newCode.save();
        return {
            statusCode: 200,
            status: "Village Successfully Added",
            message: "Village Added Successfully",
            data: newCode
        }
    }
    catch (error) {
        return {
            statusCode: 400,
            status: "Village Adding failed",
            message: "Village Adding failed",
        };
    }
};

/* Get the Detail of the Village */
export const villageDetail = async () => {
    try {
        const villageData = await Villages.aggregate([{
            $match: { status: true }
        },
        {
            "$addFields": {
                "stateIdObject": { "$toObjectId": "$state_id" },
                "districtIdObject": { "$toObjectId": "$district_id" },
                "blockIdObject": { "$toObjectId": "$block_id" }
            }
        },
        {
            $lookup:
            {
                from: "states",
                localField: "stateIdObject",
                foreignField: "_id",
                as: "state_info"
            },

        }, {
            $lookup:
            {
                from: "districts",
                localField: "districtIdObject",
                foreignField: "_id",
                as: "district_info"
            }
        }, {
            $lookup:
            {
                from: "blocks",
                localField: "blockIdObject",
                foreignField: "_id",
                as: "block_info"
            }
        }])
        return {
            statusCode: 200,
            status: "Village Detail Fetched Successfully",
            message: "Village Detail Fetched Successfully",
            data: villageData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "Block Detail fetching failed",
            message: "Block Detail fetching failed",
        };
    }
};

/* Get the Detail of the Villages by the Id*/
export const getvillagesById = async (reqQuery) => {
    try {
        const villageData = await Villages.aggregate([{
            $match: { "_id": new ObjectId(reqQuery.id) }
        },
        {
            "$addFields": {
                "stateIdObject": { "$toObjectId": "$state_id" },
                "districtIdObject": { "$toObjectId": "$district_id" },
                "blockIdObject": { "$toObjectId": "$block_id" }
            }
        },
        {
            $lookup:
            {
                from: "states",
                localField: "stateIdObject",
                foreignField: "_id",
                as: "state_info"
            }
        }, {
            $lookup:
            {
                from: "districts",
                localField: "districtIdObject",
                foreignField: "_id",
                as: "district_info"
            }
        }, {
            $lookup:
            {
                from: "blocks",
                localField: "blockIdObject",
                foreignField: "_id",
                as: "block_info"
            }
        }])
        return {
            statusCode: 200,
            status: "Village Fetched Successfully",
            message: "Village Fetched Successfully",
            data: villageData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "Village fetching failed",
            message: "Village fetching failed",
        };
    }
};

/* Update the Village based on the Id*/
export const updateVillage = async (updateBody, reqQuery) => {
    try {
        const villages = await Villages.findOne({ village_code: updateBody.village_code.trim(), status: true });
        if (villages) {
            return {
                statusCode: 400,
                status: "Village Code already Exists",
                message: "Village Code already Exists"
            };
        }
        let village = await Villages.findOne({ _id: reqQuery.id });
        if (!village) {
            return {
                statusCode: 400,
                status: "Village Not found",
                message: "Village Not found"
            };
        }
        let reqValue = {}
        reqValue.village_code = updateBody.village_code
        reqValue.village_name = updateBody.village_name
        reqValue.block_id = updateBody.block_id
        reqValue.district_id = updateBody.district_id
        reqValue.state_id = updateBody.state_id
        await Villages.updateOne({ _id: reqQuery.id }, reqValue)
        return {
            statusCode: 200,
            status: "Village Updated Successfully",
            message: "Village Updated Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Updation Failed",
            message: "Updation Failed",
        };
    }
};

/* Delete the Vilage based on the Id*/
export const deleteVillage = async (updateBody) => {
    try {
        let village = await Villages.findOne({ _id: updateBody.id,status:true  });
        if (!village) {
            return {
                statusCode: 400,
                status: "Village Not found",
                message: "Village Not found"
            };
        }

        await Villages.updateOne({ _id: updateBody.id }, { $set: { status: false } });
        return {
            statusCode: 200,
            status: "Village Deleted Successfully",
            message: "Village Deleted Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Delete Failed",
            message: "Delete Failed",
        };
    }
};