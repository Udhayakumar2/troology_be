import { Blocks } from '../models/block.model.js'
import { Villages } from '../models/village.models.js'
import mongo from 'mongodb';
const { ObjectId } = mongo;

/* Add the Blocks */
export const addBlock = async (blockValue) => {
    try {
        const block = await Blocks.findOne({ block_code: blockValue.block_code.trim(), status: true });
        if (block) {
            return {
                statusCode: 400,
                status: "Block Code already Exists",
                message: "Block Code already Exists"
            };
        }
        const { district_id, block_code, block_name, state_id } = blockValue;
        const newCode = new Blocks({ district_id, block_code, block_name, state_id });
        await newCode.save();
        return {
            statusCode: 200,
            status: "Block  Added Successfully",
            message: "Block Added Successfully",
            data: newCode
        }
    }
    catch (error) {
        return {
            statusCode: 400,
            status: "Block Adding failed",
            message: "Block Adding failed",
        };
    }
};

/* Get the Detail of the Blocks */
export const blockDetail = async () => {
    try {
        const blockData = await Blocks.aggregate([{
            $match: { status: true }
        },
        { "$addFields": { "stateIdObject": { "$toObjectId": "$state_id" }, "districtIdObject": { "$toObjectId": "$district_id" } } },
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
        }])
        return {
            statusCode: 200,
            status: "Block Detail Fetched Successfully",
            message: "Block Detail Fetched Successfully",
            data: blockData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "Block Detail fetching failed",
            message: "Block Detail fetching failed",
        };
    }
};

/* Get the Detail of the Blocks by the Id*/
export const getBlocksById = async (reqQuery) => {
    try {
        const blockData = await Blocks.aggregate([{
            $match: { "_id": new ObjectId(reqQuery.id) }
        },
        { "$addFields": { "stateIdObject": { "$toObjectId": "$state_id" }, "districtIdObject": { "$toObjectId": "$district_id" } } },
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
        }])
        return {
            statusCode: 200,
            status: "Block Fetched Successfully",
            message: "Block Fetched Successfully",
            data: blockData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "Block fetching failed",
            message: "Block fetching failed",
        };
    }
};

/* Update the Blocks based on the Id*/
export const updateBlock = async (updateBody, reqQuery) => {
    try {
        const blocks = await Blocks.findOne({ $and : [{ _id: {$nin : [ reqQuery.id]} ,block_code: updateBody.block_code.trim()}], status: true });
        if (blocks) {
            return {
                statusCode: 400,
                status: "Block Code already Exists",
                message: "Block Code already Exists"
            };
        }
        let block = await Blocks.findOne({ _id: reqQuery.id });
        if (!block) {
            return {
                statusCode: 400,
                status: "Block Not found",
                message: "Block Not found"
            };
        }
        let reqValue = {}
        reqValue.block_code = updateBody.block_code
        reqValue.block_name = updateBody.block_name
        reqValue.district_id = updateBody.district_id
        reqValue.state_id = updateBody.state_id
        await Blocks.updateOne({ _id: reqQuery.id }, reqValue)
        return {
            statusCode: 200,
            status: "Block Updated Successfully",
            message: "Block Updated Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Updation Failed",
            message: "Updation Failed",
        };
    }
};

/* Delete the Block based on the Id*/
export const deleteBlock = async (updateBody) => {
    try {
        let block = await Blocks.findOne({ _id: updateBody.id });
        let village = await Villages.findOne({ district_id: updateBody.id });
        if (!block) {
            return {
                statusCode: 400,
                status: "Block Not found",
                message: "Block Not found"
            };
        }
        if (village) {
            return {
                statusCode: 400,
                status: "Block found in Village",
                message: "Block found in Village"
            };
        }
        await Blocks.updateOne({ _id: updateBody.id }, { $set: { status: false } });
        return {
            statusCode: 200,
            status: "Block Deleted Successfully",
            message: "Block Deleted Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Delete Failed",
            message: "Delete Failed",
        };
    }
};

/* Get the Block by District Id*/
export const getblockByDistrictId = async (updateBody) => {
    try {
        const BlockData = await Blocks.find({ district_id: updateBody.id, status: true },{})
        return {
            statusCode: 200,
            status: "District Fetched Successfully",
            message: "District Fetched Successfully",
            data: BlockData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "District fetching failed",
            message: "District fetching failed",
        };
    }
};