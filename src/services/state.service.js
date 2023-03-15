import { States } from '../models/state.models.js';
import { Districts } from '../models/district.models.js';

/* Add the State */
export const addState = async (stateValue) => {
  try {
    const state = await States.findOne({ $or: [{ state_code: stateValue.state_code.trim(), state_name: stateValue.state_name }], status: true });
    if (state) {
      return {
        statusCode: 403,
        status: "State Details already Exists",
        message: "State Details already Exists"
      };
    }
    const { state_name, state_code } = stateValue;
    const newCode = new States({ state_name, state_code });
    await newCode.save();
    return {
      statusCode: 201,
      status: "Successfully Added",
      message: "State Added Successfully",
      data: newCode
    }
  }
  catch (error) {
    return {
      statusCode: 400,
      status: "State Adding failed",
      message: "State Adding failed",
    };
  }
};

/* Get the Detail of the State */
export const stateDetail = async () => {
  try {
    const stateDetail = await States.find({ status: true }, {});
    return {
      statusCode: 200,
      status: "State Detail Fetched Successfully",
      message: "State Detail Fetched Successfully",
      data: stateDetail
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: "State Detail fetching failed",
      message: "State Detail fetching failed",
    };
  }
};

/* Get the Detail of the State by the Id*/
export const getStatesById = async (reqQuery) => {
  try {
    const stateDetail = await States.find({ "_id": reqQuery.id }, {});
    return {
      statusCode: 200,
      status: "State Fetched Successfully",
      message: "State Fetched Successfully",
      data: stateDetail
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: "State fetching failed",
      message: "State fetching failed",
    };
  }
};

/* Update the State based on the Id*/
export const updateState = async (updateBody, reqQuery) => {
  try {
    const states = await States.findOne({ $or: [{ state_code: updateBody.state_code, state_name: updateBody.state_name }], status: true });
    if (states) {
      return {
        statusCode: 403,
        status: "State Details already Exists",
        message: "State Details already Exists"
      };
    }
    let state = await States.findOne({ _id: reqQuery.id, status: true });
    if (!state) {
      return {
        statusCode: 400,
        status: "State Not found",
        message: "State Not found"
      };
    }
    let reqValue = {}
    reqValue.state_code = updateBody.state_code
    reqValue.state_name = updateBody.state_name
    await States.updateOne({ _id: reqQuery.id }, reqValue)
    return {
      statusCode: 200,
      status: "State Updated Successfully",
      message: "State Updated Successfully"
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: "Updation Failed",
      message: "Updation Failed",
    };
  }
};

/* Delete the State based on the Id*/
export const deleteState = async (updateBody) => {
  try {
    let state = await States.findOne({ _id: updateBody.id, status: true });
    let district = await Districts.findOne({ state_id: updateBody.id, status: true })
    if (!state) {
      return {
        statusCode: 404,
        status: "State Not found",
        message: "State Not found"
      };
    }
    if (district) {
      return {
        statusCode: 201,
        status: "State found in District",
        message: "State found in District"
      };
    }
    await States.updateOne({ _id: updateBody.id }, { $set: { status: false } });
    return {
      statusCode: 200,
      status: "State Deleted Successfully",
      message: "State Deleted Successfully"
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: "Delete Failed",
      message: "Delete Failed",
    };
  }
};