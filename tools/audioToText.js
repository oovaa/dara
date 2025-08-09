// NOTE: This is a utility script that was previously using OpenAI's Whisper
// It has been commented out as it requires a paid OpenAI service
// For free alternatives, consider using:
// 1. Browser Web Speech API for client-side transcription
// 2. Google Cloud Speech-to-Text (has free tier)
// 3. Azure Speech Services (has free tier)
// 4. Local models like Whisper.cpp or wav2vec2

/*
import fs from 'fs'
import download from '../utils/downloadVideo.js'
import { config } from 'dotenv'

config()

const audiototext = async (url) => {
  try {
    const video = await download(url)
    // TODO: Replace with free speech-to-text service
    console.log('Audio transcription feature disabled - requires free alternative to OpenAI Whisper')
  } catch (err) {
    console.log(err.message)
  }
}

// audiototext('https://www.youtube.com/watch?v=JR36oH35Fgg')
*/

console.log('Audio transcription feature temporarily disabled - use free alternatives to OpenAI Whisper')
