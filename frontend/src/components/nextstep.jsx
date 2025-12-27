import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'


const Nextstep = () => {
    const [question, setQuestion] = useState([]);
    const [index, setIndex] = useState(-1);
    const [audioUrl, setAudioUrl] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [isListening, setIsListening] = useState(false)

    useEffect(() => {
        const func = async () => {
            const resp = await axios.get(`http://localhost:3000/questions/get/${1}`);
            const texts = resp.data.map(q => q.text)
            setQuestion(texts)
        }
        func()
    }, [])


    //text to speech
    const handleClick = async (usage) => {
        try {
            setAudioUrl(null)
            const nextIdx = index + 1;
            console.log(nextIdx);
            setIndex(index + 1)
            const response = await axios.post(
                `https://api.elevenlabs.io/v1/${usage}/JBFqnCBsd6RMkjVDRZzb`,
                {
                    text: question[nextIdx],
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                },
                {
                    headers: {
                        "xi-api-key": "f1665b7c4a4fdd5f5c47f3b9f5aa5c72af284f6d7e6d388de4a59d62b64a15aa",
                        "Content-Type": "application/json"
                    },
                    responseType: "arraybuffer"
                }
            )

            const blob = new Blob([response.data], { type: "audio/mpeg" })
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
        } catch (err) {
            console.error(err)
            alert("Speech generation failed")
        }
    }

    return (
        <div className='flex md:flex-row flex-col h-screen w-screen'>

            <div className='bg-blue-500 w-screen h-1/2 sm:h-screen lg:h-screen md:h-screen flex flex-col justify-center items-center gap-2'>

                <div className=''>
                    <SmartToyIcon className='bg-white rounded-full h-1/4 w-1/4' sx={{ fontSize: 80 }}></SmartToyIcon>
                </div>
                <div onClick={handleClick("text-to-speech")} className='text-white bg-teal-500 rounded-md p-1 cursor-pointer'>
                    play question
                </div>
                {audioUrl && (
                    <audio controls autoPlay>
                        <source src={audioUrl} type="audio/mpeg" />
                    </audio>
                )}

            </div>

            <div className='bg-blue-200 w-screen h-1/2 sm:h-screen lg:h-screen md:h-screen flex flex-col justify-center items-center gap-2'>
                <div className=''>
                    <AccountCircleIcon className='bg-white rounded-full h-1/4 w-1/4' sx={{ fontSize: 80 }}></AccountCircleIcon>
                </div>
                <div className='flex flex-col gap-2'>
                    {!isListening ? (
                        <button
                            onClick={() => {
                                SpeechRecognition.startListening({
                                    continuous: true,
                                    interimResults: true,
                                    language: "en-US"
                                })
                                setIsListening(true)
                            }}

                            className="text-white bg-blue-500 rounded-md p-1 cursor-pointer"
                        >
                            Start Listening
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                SpeechRecognition.stopListening()
                                setTimeout(() => {
                                    console.log("FINAL TRANSCRIPT:", transcript)
                                }, 300)
                                setIsListening(false)
                            }}

                            className="text-white bg-blue-500 rounded-md p-1 cursor-pointer"
                        >
                            Stop Listening
                        </button>
                    )}



                    {/* <div >
                        <button className='text-white bg-blue-500 rounded-md p-1 cursor-pointer' onClick={resetTranscript}>Reset</button>
                    </div>
                    <p>Transcript: {transcript}</p> */}
                </div>
            </div>
        </div>
    )
}

export default Nextstep

