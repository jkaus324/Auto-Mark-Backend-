import ClassRoom from "../models/classroom.js";
import User from "../models/user.js"; // Assuming you have a User model
import {exec} from 'child_process'

export const createClassroom = async (req, res) => {
  const { email, name } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create the classroom
    const classroom = new ClassRoom({
      host: user._id, // Assuming host should be the user's _id
      name: name,
      code: generateUniqueCode(), // You need to implement this function to generate a unique code
      students: [],
    });

    user.createdClassrooms.push(classroom.code)
    await user.save(); 

    // Save the classroom to the database
    await classroom.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Classroom created successfully",
        classroom: classroom,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
  }
};

export const joinClassroom = async (req, res) => {
  const { code, email } = req.body;

  try {
    // Find the classroom by code
    const classroom = await ClassRoom.findOne({ code: code });
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user is already in the classroom
    if (classroom.students.includes(user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "User is already in the classroom" });
    }

    user.joinedClassrooms.push(classroom.code)
    await user.save();
    // Add the user to the classroom
    classroom.students.push(user._id);
    await classroom.save();

    return res.json({
      success: true,
      message: "User joined classroom successfully",
      classroom: classroom,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
  }
};

function generateUniqueCode() {
  const codeLength = 4;
  let code = "";

  // Generate a random 4-digit code
  for (let i = 0; i < codeLength; i++) {
    code += Math.floor(Math.random() * 10); // Generate random number between 0 and 9
  }

  return code;
}

// Get classroom attendance of students who were marked present
export const getroom = async (req, res) => {
  const { room } = req.params; // Assuming you're passing class code as a URL parameter

  try {
    // Find the classroom by code
    console.log(room);
    const classroom = await ClassRoom.findOne({ code: room });
    console.log(classroom);
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    // Get the attendance records of students who were marked present
    const presentStudents = classroom.attendance;
    const totalStudents = classroom.students;

    return res.json({ success: true, presentStudents: presentStudents, totalStudents: totalStudents });
  } catch (error) {
    console.error("Error getting classroom attendance: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Error getting classroom attendance" });
  }
};

// Set classroom attendance of students
export const setroom = async (req, res) => {
  const { attendanceRecords } = req.body;
  const { room } = req.params;

  try {
    
    const classroom = await ClassRoom.findOne({ code: room });
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    
    // attendance records map, in there there is id of user which is to be added to the list of presentStudents
    classroom.attendance.students = attendanceRecords;
    await classroom.save();

    return res.json({
      success: true,
      message: "Classroom attendance updated successfully",
    });
  } catch (error) {
    console.error("Error setting classroom attendance: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Error setting classroom attendance" });
  }
};

export const details = async (req,res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email: email});
    const joinedclassroom = user.joinedClassrooms;
    const createdclassroom = user.createdClassrooms;

    return res.json({success: true, joinedclassroom: joinedclassroom, createdclassroom: createdclassroom});

  } catch(err) {
    console.error(err)
  }
}

export const autoMark = (req, res)=>{
    let matchedNames = runScript();
    console.log(matchedNames);
}

export const runScript = () => {
  const pythonScriptPath = 'main.py';

  // Command to execute Python script
  const command = `python ${pythonScriptPath}`;

  // Execute Python script
  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing Python script: ${error}`);
          res.status(500).json({ error: 'Error executing Python script' });
          return;
      }

      // Output from Python script (matched names)
      const matchedNames = stdout.trim().split('\n');
      console.log(`Matched Names: ${matchedNames}`);

      if (stderr) {
          console.error(`stderr: ${stderr}`);
      }

      // Send matched names to frontend
      return matchedNames;
  });
};
