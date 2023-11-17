const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
    const arg1 = 'Hello World from Node.js'; 
    const pythonProcess = spawn('python', ['python.py', arg1]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    res.end('Python script running...');
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
