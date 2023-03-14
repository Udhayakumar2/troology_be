import * as mongoose from 'mongoose'

const stateSchema = new mongoose.Schema({
    state_code: {
        type: String,
        required: true
    },
    state_name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const States = mongoose.model('States',stateSchema)