import * as mongoose from 'mongoose'

const districtSchema = new mongoose.Schema({
    district_code: {
        type: String,
        required: true
    },
    district_name: {
        type: String,
        required: true
    },
    state_id:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const Districts = mongoose.model('Districts',districtSchema)