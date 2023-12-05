const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route to handle requests for the HTML file
app.get('/', (req, res) => {
    // Assuming 'index.html' is the name of your HTML file
    const filePath = path.join(__dirname, 'public', 'index.html');

    // Read the HTML file and send it as the response
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

app.post('/upload', upload.single('audio'), (req, res) => {
    // Save the audio file and update the short film
    // Use req.file.buffer to access the uploaded audio data

    const fileName = `audio_${Date.now()}.wav`; // You can adjust the file format as needed
    const filePath = `uploads/${fileName}`;

    fs.writeFileSync(filePath, req.file.buffer);

    // Add logic to concatenate the audio to your short film
    // Update the short film using the filePath

    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}`);
});