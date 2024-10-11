import axios from "axios";

const musicApiUrl = "https://encompass-h-1.onrender.com/api/music";
const textApiUrl = "https://encompass-h.vercel.app/api/text";
const imageApiUrl = "https://encompass-h-1.onrender.com/api/image";

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

// Utility function to check if a string is a valid UUID
function isValidUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function checkFileType(url) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
  console.log("url", url);
  // Check if the URL ends with an image extension
  const extension = url.split(".").pop().toLowerCase();
  if (imageExtensions.includes(extension)) {
    return "image";
  }

  // Check if the URL is a valid UUID
  if (isValidUUID(url)) {
    return "audio"; // Recognize UUIDs as music identifiers
  }

  return "text"; // If neither, return unknown
}

// Helper function to append the last AI text response to the current input
function appendLastTextResponse(currentInput) {
  // Check if the input contains "no" or "new" (case-insensitive)
  if (/no|new/i.test(currentInput)) {
    return currentInput; // Do not append previous response
  }

  // // Append the last response if the array is not empty
  // if (aiResponseArray.length > 0) {
  //   const lastAiResponse = aiResponseArray[aiResponseArray.length - 1];
  //   return `${currentInput} based on previous context: ${lastAiResponse}`;
  // }

  return currentInput;
}

// Function to call the Music API task_ID
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
      console.log("Music taskId: ", response.data.taskId);
      let res = [];
      res.push(response.data.taskId);
      return res;
    })
    .catch((error) => {
      console.error("Music API Error:", error);
      return error;
    });
}

// Function to call the Music API
export function callMusicTaskId(input) {
  const musicPayload = {};

  return axios
    .get(`${musicApiUrl}/${input}`)
    .then((response) => {
      console.log("Taskid music Response: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Music TaskId Error:", error);
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
      // aiResponseArray.push(aiResponse);
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

export async function pollMusicTaskId(
  input,
  maxAttempts = 7,
  interval = 60000
) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await callMusicTaskId(input);
      console.log("this res:", response);
      // Check for a valid response
      if (response.status === "completed") {
        console.log("Valid Music Response: ", response.audioUrl);
        attempts  = maxAttempts;
        return response.audioUrl; // Return the valid response
      } else {
        console.log(`Attempt ${attempts + 1}: Music task is still pending...`);
      }
    } catch (error) {
      console.error("Error fetching music task ID:", error);
    }

    // Wait for the specified interval before retrying
    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error("Max attempts reached without a valid response.");
}
