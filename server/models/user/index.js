import findOrCreate from "mongoose-findorcreate";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    numbers: [],
    profile: {
        type: Object
    }
});

userSchema.plugin(findOrCreate);

const userModel = mongoose.model("User", userSchema);

export default userModel;
