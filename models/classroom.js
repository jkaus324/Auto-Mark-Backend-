import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const classroomSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    attendance: [attendanceSchema]
});

const ClassRoom = mongoose.model('ClassRoom', classroomSchema);

export default ClassRoom;
