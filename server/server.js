// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
// Middleware to parse JSON requests and enable CORS
app.use(cors());
app.use(express.json());

app.options("*", cors());

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
    const response = await axios.get(url, { headers });
    const data = response.data;

    console.log("Current Status:", data.data.status);
    if (data.data.status == "completed") {
      const audioUrl = [];
      const clips = data.data.clips;
      for (let i = 0; i < 2; i++) {
        let firstItem = Object.keys(clips)[i];
        audioUrl.push(clips[firstItem].audio_url);
      }
      return audioUrl; // Return completed audio URLs
    } else if (data.data.status === "failed") {
      throw new Error("Audio generation failed");
    } else {
      throw new Error("pending"); // Signal that the status is still pending
    }
  } catch (error) {
    if (error.message === "pending") {
      throw new Error("pending"); // Continue signaling pending status
    }
    throw new Error("Failed to retrieve audio_url");
  }
};

app.get("/", (req, res) => res.send("Express on Vercel"));

// Modified POST endpoint for Music API
app.post("/api/music", async (req, res) => {
  try {
    // Start the music generation request
    const response = await axios.post(musicApiUrl, req.body, { headers });
    const taskId = response.data.data.task_id;
    console.log(taskId);
    // Return the taskId immediately to the client
    res.json({
      taskId: taskId,
    });
  } catch (error) {
    console.error("Error in Music API Call:", error);
    res.status(500).json({
      error: "Music API request failed",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Route to poll for status using taskId
app.get("/api/music/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const audioUrl = await fetchAudioUrl(taskId); // Fetch the status and possibly audio URLs
    res.json({ status: "completed", audioUrl }); // If completed, send the audio URLs
  } catch (error) {
    // Handle case where audio is not yet ready (still pending)
    res.json({
      status: "pending",
      message: "Music is still generating. Try again later.",
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
