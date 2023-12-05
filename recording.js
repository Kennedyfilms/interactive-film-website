// recording.js

// Make sure to import Recorder from the correct path based on your project structure
// Adjust the path accordingly
// For example, if Recorder.js is in the same directory as recording.js:
// import Recorder from './Recorder'; 

let Recorder;

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            const audioContext = new AudioContext();
            const inputNode = audioContext.createMediaStreamSource(stream);
            Recorder = new Recorder(inputNode); // Corrected variable name
            Recorder.record();
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });
}

function stopRecording() {
    Recorder.stop();
}

function submitRecording() {
    Recorder.exportWAV((blob) => {
        const formData = new FormData();
        formData.append('audioRecording', blob, 'recorded_audio.wav');

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error uploading audio:', error);
        });
    });
}

// Include Recorder.js library
// Adjust the path based on the actual location of your Recorder.js file
// For example, if Recorder.js is in the same directory as recording.js:
// <script src="./Recorder.js"></script>