import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    return (
        <>
            <div className="main">
                <div className="nav">
                    <p>My Gemini</p>
                    <img src={assets.user_icon} alt="" />
                </div>
                <div className="main-container">
                    {!showResult ? <><div className="greet">
                        <p>
                            <span>Hy, Devolper.</span>
                        </p>
                        <p>How can I help you ?</p>
                    </div>
                        <div className="cards">
                            <div className="card">
                                <p>What is the difference between frontend and backend development?</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>How do version control systems like Git work?</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>What are the best practices for writing clean code?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>How do you optimize website performance?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                        :
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
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
                    }
                    <div className="main-bottom">
                        <div className="search-box">
                            <input onChange={(e) => {
                                setInput(e.target.value)
                            }} value={input} type="text" placeholder='Prompt here' />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                               {input ?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null} 
                            </div>
                        </div>
                        <p className="bottom-info">
                            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default main
