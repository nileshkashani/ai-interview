import axios from 'axios'
import React from 'react'
import { GoogleGenAI } from '@google/genai'
import { useNavigate } from 'react-router-dom'

const home = () => {
    const navigate = useNavigate()
    const getPrompt = () => {
        return `You are an AI interview engine.

        Your task is to generate high-quality technical interview questions for post of SDE.

        output should only contain one feild (List<String> questions)

        You MUST follow these rules strictly:
        1. Output ONLY valid array of Strings.
        2. Do NOT include explanations, comments, markdown, or extra text.
        3. Do NOT wrap in code blocks.
        5. The number of questions MUST match 5.
        `
    }



    const handleClick = async () => {
        // const ai = new GoogleGenAI({apiKey: "AIzaSyBvUsi4AWd_xoL93mgriIM6owHU-ebnrWc"});



        // // ----------------Gemini Get Questions (Done)---------------------------


        // const response = await ai.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: getPrompt(),
        // });        

        const req = {
            "topic": "SDE",
            "questions": [
                "Implement an LRU (Least Recently Used) cache with a fixed capacity. Your implementation should support `get` and `put` operations with O(1) average time complexity.",
                "Design a URL shortening service like Bitly. Discuss the system components, data models, and key challenges such as collision handling and availability.",
                "Explain the SOLID principles of Object-Oriented Design. For each principle, provide a brief example of how it can be applied or violated.",
                "Describe the concept of a deadlock in concurrent programming. How can deadlocks be prevented, detected, and recovered from?",
                "Given an `Employee` table with columns `Id`, `Name`, and `Salary`, write a SQL query to find the Nth highest salary. Discuss how your solution handles edge cases like fewer than N employees or duplicate salaries."
            ]
        }
        const resp = await axios.post("http://localhost:8080/interview", req);
        if(resp.status == 200){
            navigate('/nextstep')
        }
    }
    return (
        <div>
            <button onClick={handleClick} className='cursor-pointer bg-blue-600 rounded-md text-white p-2'>
                generate questions
            </button>
        </div>
    )
}

export default home