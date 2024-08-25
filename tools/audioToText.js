import OpenAI from "openai";
import fs from "fs";
import download from "../utils/downloadVideo.js";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    apiKey: process.env.key,
})

const audiototext = async (url) => {
  try {
    const video = await download(url);
       const transcriptions = await openai.audio.transcriptions.create({
        file: video,
        model: "whisper-1",
       });
       console.log(transcriptions)
  } catch (err) {
    console.log(err.message);
  }
};

audiototext("https://www.youtube.com/watch?v=JR36oH35Fgg");