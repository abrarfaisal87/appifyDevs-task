import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =  new GoogleGenerativeAI("AIzaSyBrz02837lOM-v47CEbKX67EZP9cKfS3d4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })


export const sendMessage = async (chatHistory, userMessage) => {

 try {
    const formattedHistory = chatHistory.map(msg=>({
        role:msg.role,
        parts:[{text:msg.content}]
    }))

    formattedHistory.push({ role: "user", parts: [{ text: userMessage }] });

    const result = await model.generateContent({
        contents:formattedHistory,
        generationConfig:{
            maxOutputTokens:1024,
            temperature:0.7
        },
    })

    const responseText = result.response.text();
    return responseText;
 } catch (error) {
    console.error("gemini api error: ",error)
    return "Error:failed to get response"
 }

}
export default genAI;