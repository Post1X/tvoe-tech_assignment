import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    full_name: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    }
})

const Users = mongoose.model('Users', UsersSchema);

export default Users;
