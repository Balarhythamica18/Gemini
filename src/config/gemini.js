import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai"

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBrtHbQ73QZtmVt8LK30w5orUWCqNSnZdg";

async function runChat(prompt){
 const genAI = new GoogleGenerativeAI(API_KEY);
 const model = genAI.getGenerativeModel({model: MODEL_NAME});


const generationConfig = {
 temperature: 1,
 topP: 0.95,
 topK: 40,
 maxOutputTokens: 8192,
 responseMimeType: "text/plain",
};
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  

  const chat = model.startChat({
    generationConfig,
    safetySettings, // Correct spelling here
    history: [],
  });
  

const result = await chat.sendMessage(prompt);
const response = result.response;
console.log(response.text());
return  response.text()
} 

export default runChat;