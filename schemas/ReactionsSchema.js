import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReactionsSchema = new Schema({
    reaction: {
        type: Schema.Types.String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'News'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Reactions = mongoose.model('Reactions', ReactionsSchema)

export default Reactions;
