import * as mongoose from 'mongoose'

const villageSchema = new mongoose.Schema({
    village_code: {
        type: String,
        required: true
    },
    district_id: {
        type: String,
        required: true
    },
    state_id:{
        type: String,
        required: true
    },
    block_id:{
        type: String,
        required: true
    },
    village_name:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const Villages = mongoose.model('Villages',villageSchema)