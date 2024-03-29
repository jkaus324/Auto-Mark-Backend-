import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email addresses
    },
    password: {
        type: String,
        required: true
    },
    //classesjoined
    joinedClassrooms: [
        {
            type: String,
        }
    ],
    createdClassrooms: [
        {
            type: String
        }
    ]
    //classescreated
});

const User = mongoose.model('User', userSchema);

export default User;
