import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SavedNews = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'News'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Saved = mongoose.model('Saves', SavedNews);

export default Saved;
