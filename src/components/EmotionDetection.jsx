// src/EmotionsDetection.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const API_TOKEN = "4cdb90cb946343efa5b483c8a2b8c085";

function emotions(image, callback) {
    var myHeaders = new Headers();
    myHeaders.append("token", API_TOKEN);

    var formdata = new FormData();

    if ((typeof image === "string") && (image.indexOf("https://") === 0))
        formdata.append("photo", image);
    else
        formdata.append("photo", image, "file");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.luxand.cloud/photo/emotions", requestOptions)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => console.log('error', error));
}

const EmotionsDetection = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [emotionsResult, setEmotionsResult] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const webcamRef = useRef(null);

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
        setImageUrl(''); // Clear URL if a file is selected
    };

    const handleUrlChange = (event) => {
        setImageUrl(event.target.value);
        setImageFile(null); // Clear file if a URL is provided
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleSubmit = () => {
        if (capturedImage) {
            fetch(capturedImage)
                .then(res => res.blob())
                .then(blob => {
                    emotions(blob, (result) => {
                        setEmotionsResult(result);
                    });
                });
        } else if (imageFile || imageUrl) {
            emotions(imageFile || imageUrl, (result) => {
                setEmotionsResult(result);
            });
        } else {
            alert("Please provide an image or URL.");
        }
    };

    const formatEmotions = (emotions) => {
        return Object.keys(emotions).map(emotion => (
            <li key={emotion} style={styles.emotionItem}>
                <strong>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}:</strong> {Math.round(emotions[emotion] * 100)}%
            </li>
        ));
    };

    return (
        <div style={styles.container}>
            <h1>Emotions Detection</h1>
            <div style={styles.inputContainer}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    style={styles.urlInput}
                />
            </div>
            <div style={styles.webcamContainer}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={{
                        width: 350,
                        height: 300,
                        facingMode: "user"
                    }}
                />
                <button onClick={capture} style={styles.captureButton}>Capture Image</button>
                {capturedImage && <img src={capturedImage} alt="Captured" style={styles.capturedImage} />}
            </div>
            <button onClick={handleSubmit} style={styles.submitButton}>Detect Emotions</button>
            {emotionsResult && emotionsResult.faces.length > 0 && (
                <div style={styles.results}>
                    <h3>Detected Emotions:</h3>
                    <ul style={styles.emotionsList}>
                        {formatEmotions(emotionsResult.faces[0].emotions)}
                    </ul>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    fileInput: {
        padding: '10px',
    },
    urlInput: {
        padding: '10px',
        width: '300px',
    },
    webcamContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px',
    },
    captureButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    capturedImage: {
        marginTop: '10px',
        width: '100%',
        maxWidth: '350px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    results: {
        marginTop: '20px',
        textAlign: 'left',
        maxWidth: '600px',
        wordWrap: 'break-word',
    },
    emotionsList: {
        listStyleType: 'none',
        padding: 0,
    },
    emotionItem: {
        fontSize: '16px',
        marginBottom: '8px',
    },
};

export default EmotionsDetection;
