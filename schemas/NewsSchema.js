import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    text: {
        type: Schema.Types.String
    },
    date: {
        type: Schema.Types.Date
    },
    saved: {
        type: Schema.Types.Number
    },
    isAccident: {
        type: Schema.Types.Boolean
    },
    image: {
        type: Schema.Types.String
    }
});

const News = mongoose.model('News', NewsSchema);

export default News;
