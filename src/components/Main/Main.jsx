import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
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
                                <p>
                                    <span>Hi, Sir.</span>
                                </p>
                                <p>How can I assist you today?</p>
                            </div>
                            <div className="cards">
                               
                            </div>
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
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
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
                                <img src={assets.mic_icon} alt="" />
                                {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                            </div>
                        </div>
                        <p className="bottom-info">
                            Empathic Bot may display inaccurate info, including about people, so double-check its responses. Your privacy & Empathic Bot Apps.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
