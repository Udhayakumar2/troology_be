import * as mongoose from 'mongoose'

const blockSchema = new mongoose.Schema({
    block_code: {
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
    block_name:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const Blocks = mongoose.model('Blocks',blockSchema)