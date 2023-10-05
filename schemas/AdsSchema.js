import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdsSchema = new Schema({
    image: {
        type: Schema.Types.String
    },
    text: {
        type: Schema.Types.String
    },
    url: {
        type: Schema.Types.String
    },
    isRelevant: {
        type: Schema.Types.Boolean
    }
})

const Ads = mongoose.model('Ads', AdsSchema)

export default Ads;
