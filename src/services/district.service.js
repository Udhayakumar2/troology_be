import { Districts } from '../models/district.models.js'
import { Blocks } from '../models/block.model.js'
import mongo from 'mongodb';
const { ObjectId } = mongo;

/* Add the Districts */
export const addDistrict = async (districtValue) => {
    try {
        const district = await Districts.findOne({ district_code: districtValue.district_code.trim(), status: true });
        if (district) {
            return {
                statusCode: 201,
                status: "District Code already Exists",
                message: "District Code already Exists"
            };
        }
        const { district_name, district_code, state_id } = districtValue;
        const newCode = new Districts({ district_name, district_code, state_id });
        await newCode.save();
        return {
            statusCode: 200,
            status: "Successfully Added",
            message: "District Added Successfully",
            data: newCode
        }
    }
    catch (error) {
        return {
            statusCode: 400,
            status: "District Adding failed",
            message: "District Adding failed",
        };
    }
};

/* Get the Detail of the District */
export const districtDetail = async () => {
    try {
        const distData = await Districts.aggregate([{
            $match: { status: true }
        },
        { "$addFields": { "stateIdObject": { "$toObjectId": "$state_id" } } },
        {
            $lookup:
            {
                from: "states",
                localField: "stateIdObject",
                foreignField: "_id",
                as: "state_info"
            }
        }])
        return {
            statusCode: 200,
            status: "District Detail Fetched Successfully",
            message: "District Detail Fetched Successfully",
            data: distData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "District Detail fetching failed",
            message: "District Detail fetching failed",
        };
    }
};

/* Get the District of the Blocks by the Id*/
export const getdistrictsById = async (reqQuery) => {
    try {
        const distData = await Districts.aggregate([{
            $match: { "_id": new ObjectId(reqQuery.id) }
        },
        { "$addFields": { "stateIdObject": { "$toObjectId": "$state_id" } } },
        {
            $lookup:
            {
                from: "states",
                localField: "stateIdObject",
                foreignField: "_id",
                as: "state_info"
            }
        }])
        return {
            statusCode: 200,
            status: "District Fetched Successfully",
            message: "District Fetched Successfully",
            data: distData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "District fetching failed",
            message: "District fetching failed",
        };
    }
};

/* Update the District based on the Id*/
export const updateDistrict = async (updateBody, reqQuery) => {
    try {
        const districts = await Districts.findOne({ $and : [{ _id: {$nin : [ reqQuery.id]} ,district_code: updateBody.district_code.trim()}], status: true });
        if (districts) {
            return {
                statusCode: 201,
                status: "District Code already Exists",
                message: "District Code already Exists"
            };
        }
        let district = await Districts.findOne({ _id: reqQuery.id ,status:true });
        if (!district) {
            return {
                statusCode: 400,
                status: "District Not found",
                message: "District Not found"
            };
        }
        let reqValue = {}
        reqValue.district_code = updateBody.district_code
        reqValue.district_name = updateBody.district_name
        reqValue.state_id = updateBody.state_id
        await Districts.updateOne({ _id: reqQuery.id }, reqValue)
        return {
            statusCode: 200,
            status: "District Updated Successfully",
            message: "District Updated Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Updation Failed",
            message: "Updation Failed",
        };
    }
};

/* Delete the District based on the Id*/
export const deleteDistrict = async (updateBody) => {
    try {
        let district = await Districts.findOne({ _id: updateBody.id,status:true  });
        let block = await Blocks.findOne({ district_id: updateBody.id,status:true  });
        if (!district) {
            return {
                statusCode: 400,
                status: "District Not found",
                message: "District Not found"
            };
        }
        if (block) {
            return {
                statusCode: 201,
                status: "District found in Block",
                message: "District found in Block"
            };
        }
        await Districts.updateOne({ _id: updateBody.id }, { $set: { status: false } });
        return {
            statusCode: 200,
            status: "District Deleted Successfully",
            message: "District Deleted Successfully"
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "Delete Failed",
            message: "Delete Failed",
        };
    }
};

/* Get the District by State Id*/
export const getDistrictsByStateId = async (updateBody) => {
    try {
        const districtData = await Districts.find({ state_id: updateBody.id , status: true},{})
        return {
            statusCode: 200,
            status: "District Fetched Successfully",
            message: "District Fetched Successfully",
            data: districtData
        };
    } catch (error) {
        return {
            statusCode: 400,
            status: "District fetching failed",
            message: "District fetching failed",
        };
    }
};