import React, { useContext, useState, useEffect } from 'react';
import './Conv.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Conv = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [isListening, setIsListening] = useState(false);
    const [speechRecognition, setSpeechRecognition] = useState(null);
    const [fullResponse, setFullResponse] = useState(''); // Store the full GPT response

    useEffect(() => {
        // Initialize Speech Recognition
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        setSpeechRecognition(recognition);
    }, [setInput]);

    const handleVoiceInput = () => {
        if (speechRecognition) {
            if (isListening) {
                speechRecognition.stop();
            } else {
                setIsListening(true);
                speechRecognition.start();
            }
        }
    };

    const speakResponse = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        synth.speak(utterance);
    };

    useEffect(() => {
        if (!loading && resultData) {
            setFullResponse(resultData); // Store the entire response at once
            setTimeout(() => {
                speakResponse(resultData); // Speak the stored response after a delay of 8 seconds
            }, 8000);
        }
    }, [loading, resultData]);

    const handleSpeakButtonClick = () => {
        speakResponse(fullResponse); // Speak the stored full response when the button is clicked
    };

    return (
        <>
            <div className="main">
                <div className="nav">
                    <p>My Empathic Bot</p>
                    <img src={assets.user_icon} alt="" />
                </div>
                <div className="main-container">
                    {!showResult ? (
                        <>
                            <div className="greet">
                                <p><span>Hi, Sir.</span></p>
                                <p>How can I assist you today?</p>
                            </div>
                            <div className="cards"></div>
                        </>
                    ) : (
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.empathic_bot_icon} alt="" />
                                {loading ? (
                                    <div className='loader'>
                                        <div className='hr'></div>
                                        <div className='hr'></div>
                                        <div className='hr'></div>
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p> // Show the full response at once
                                )}
                            </div>
                        </div>
                    )}
                    <div className="main-bottom">
                        <div className="search-box">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                                placeholder='Prompt here'
                            />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img
                                    src={assets.mic_icon}
                                    alt=""
                                    onClick={handleVoiceInput}
                                    style={{ opacity: isListening ? 1 : 0.5 }}
                                />
                                {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                            </div>
                        </div>
                        <div className="voice-button-container">
                            <button onClick={handleSpeakButtonClick} className="voice-button">
                                Speak Response
                            </button>
                        </div>
                        <p className="bottom-info">
                            Empathic Bot may display inaccurate info, including about people, so double-check its responses. Your privacy & Empathic Bot Apps.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conv;
