// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// API keys and endpoints
const musicApiUrl = "https://api.goapi.ai/api/suno/v1/music";
const textApiUrl = "https://api.goapi.xyz/api/chatgpt/v1/conversation/";
const imageApiUrl = "https://api.midjourneyapi.xyz/sd/txt2img";
const headers = {
  "X-API-Key": process.env.VITE_X_API_Key,
  "Content-Type": "application/json",
};

const fetchAudioUrl = async (taskId) => {
  const url = `${musicApiUrl}/${taskId}`;
  try {
    let status = "pending";
    let audioUrl = [];
    while (status === "pending") {
      const response = await axios.get(url, { headers });
      const data = response.data;

      console.log("Current Status:", data.data.status);
      if (data.data.status == "completed") {
        console.log("Completed got here.....");
        const clips = data.data.clips;
        for (let i = 0; i < 2; i++) {
          let firstItem = Object.keys(clips)[i];
          audioUrl.push(clips[firstItem].audio_url);
        }
        break;
      } else if (data.status === "failed") {
        throw new Error("Audio generation failed");
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return audioUrl;
  } catch (error) {
    console.error("Error fetching audio_url:", error);
    throw new Error("Failed to retrieve audio_url");
  }
};

const pollForAudioUrl = async (taskId) => {
  const pollInterval = 2000;
  const maxAttempts = 10;
  let attempts = 0;
  let audioUrl = [];

  while (attempts < maxAttempts) {
    try {
      audioUrl = await fetchAudioUrl(taskId);
      if (audioUrl.length > 0) break;
    } catch (error) {
      console.log(`Polling attempt ${attempts + 1} failed. Retrying...`);
    }
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  if (!audioUrl) {
    throw new Error("Failed to retrieve audio_url after multiple attempts");
  }

  return audioUrl;
};
app.get("/", (req, res) => res.send("Express on Vercel"));

// POST endpoint for Music API
app.post("/api/music", async (req, res) => {
  try {
    const response = await axios.post(musicApiUrl, req.body, { headers });
    const taskId = await response.data.data.task_id;

    const audioUrl = await pollForAudioUrl(taskId);
    res.json(audioUrl);
  } catch (error) {
    console.error("Error in Text API Call:", error);
    res.status(error.response ? error.response.status : 500).json({
      error: "Music API request failed",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// POST endpoint for Text API
app.post("/api/text", async (req, res) => {
  try {
    const response = await axios.post(textApiUrl, req.body, { headers });
    res.json(response.data);
  } catch (error) {
    console.error("Error in Text API Call:", error);
    res.status(error.response ? error.response.status : 500).json({
      error: "Text API request failed",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// POST endpoint for Image API
app.post("/api/image", async (req, res) => {
  try {
    const response = await axios.post(imageApiUrl, req.body, { headers });
    res.json(response.data.output);
  } catch (error) {
    console.error("Error in Text API Call:", error);
    res.status(error.response ? error.response.status : 500).json({
      error: "Image API request failed",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
