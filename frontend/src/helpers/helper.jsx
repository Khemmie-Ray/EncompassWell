import axios from "axios";

const musicApiUrl = "https://encompass-h.vercel.app/api/music";
const textApiUrl =  "https://encompass-h.vercel.app/api/text";
const imageApiUrl = "https://encompass-h.vercel.app/api/image";

const headers = {
  "X-API-Key": import.meta.env.VITE_X_API_KEY,
  "Content-Type": "application/json",
};
// Array to store AI responses from the text API
let aiResponseArray = [];

// Function to analyze input and decide which API to call
export function handleUserInput(input) {
  // Check for music-related keywords
  if (/play|song|music/i.test(input)) {
    let finalInput = appendLastTextResponse(input);
    return callMusicApi(finalInput);
  }
  // Check for image-related keywords
  else if (/image|draw|picture|art/i.test(input)) {
    let finalInput = appendLastTextResponse(input);
    return callImageApi(finalInput);
  }
  // Fallback to text-based interaction
  else {
    return callTextApi(input);
  }
}

export function checkFileType(url) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
  const musicExtensions = ["mp3", "wav", "ogg", "flac"];

  const extension = url.split(".").pop().toLowerCase();

  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (musicExtensions.includes(extension)) {
    return "music";
  } else {
    return "unknown";
  }
}

// Helper function to append the last AI text response to the current input
function appendLastTextResponse(currentInput) {
  // Check if the input contains "no" or "new" (case-insensitive)
  if (/no|new/i.test(currentInput)) {
    return currentInput; // Do not append previous response
  }

  // Append the last response if the array is not empty
  if (aiResponseArray.length > 0) {
    const lastAiResponse = aiResponseArray[aiResponseArray.length - 1];
    return `${currentInput} based on previous context: ${lastAiResponse}`;
  }

  return currentInput;
}

// Function to call the Music API
function callMusicApi(input) {
  const musicPayload = {
    custom_mode: false,
    mv: "chirp-v3-5",
    input: {
      gpt_description_prompt: input, // user input + last AI text response
      make_instrumental: false,
    },
  };

  return axios
    .post(musicApiUrl, musicPayload)
    .then((response) => {
      console.log("Music Response: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Music API Error:", error);
      return error;
    });
}

// Function to call the Text API
function callTextApi(input) {
  const textPayload = {
    content: {
      content_type: "text",
      parts: [input],
    },
  };

  return axios
    .post(textApiUrl, textPayload)
    .then((response) => {
      // Save the AI response text into the array
      const aiResponse = response.data; // Assuming response.data contains the AI's response text
      aiResponseArray.push(aiResponse);
      console.log("Text Response: ", aiResponse);
      return aiResponse;
    })
    .catch((error) => {
      console.error("Text API Error:", error);
      return error;
    });
}

// Function to call the Image API
function callImageApi(input) {
  const imagePayload = {
    model_id: "midjourney",
    prompt: input, // user input + last AI text response
    negative_prompt: "best quality, masterpiece, (photorealistic:1.4)",
    width: "512",
    height: "512",
    seed: null,
    lora_model: null,
    lora_strength: null,
    samples: 2,
  };

  return axios
    .post(imageApiUrl, imagePayload)
    .then((response) => {
      console.log("Image Response: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Image API Error:", error);
      return error;
    });
}
