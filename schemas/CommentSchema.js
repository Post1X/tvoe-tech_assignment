import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: Schema.Types.String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    date: {
        type: Schema.Types.Date
    },
    userName: {
        type: Schema.Types.String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'News'
    }
})

const Comments = mongoose.model('Comment', CommentSchema)

export default Comments;
