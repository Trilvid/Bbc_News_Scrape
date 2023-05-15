import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    article: {
        type: [Object],
        required: [true, "please this field cannot be empty"]
    },
    createdAt: {
        type:Date
    }

});
export const Data = mongoose.model('data', dataSchema)
