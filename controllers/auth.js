import {exec} from 'child_process'

export const signin = (req, res) => {

    res.send('signin');
}

export const signup = (req, res) => {

    res.send('signup');
}

export const main = (req, res)=>{
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
  
      // Output from Python script
      console.log(`Output: ${stdout}`);
      
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      
      // Send output to frontend
      res.json({ output: stdout });
    });
}