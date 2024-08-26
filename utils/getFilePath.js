import { spawn } from 'child_process'
import path from 'path'

const getFilePath = async (url) => {
  return new Promise((resolve, reject) => {
    const outputDir = 'downloads'
    const outputTemplate = '%(title)s.%(ext)s'
    const outputPath = path.join(outputDir, outputTemplate)

    const child2 = spawn('yt-dlp', ['--get-filename', '-o', outputPath, '-x', url])

    let stderrData2 = ''
    let stdoutData2 = ''

    child2.stdout.on('data', (data) => {
      stdoutData2 += data.toString()
    })

    child2.stderr.on('data', (data) => {
      stderrData2 += data.toString()
    })

    child2.on('close', (code) => {
      if (!code) {
        resolve(stdoutData2)
      } else {
        reject(new Error(`process exited with code ${code}: ${stderrData2}`))
      }
    })
    child2.on('error', (err) => {
      reject(new Error(`Failed to start process: ${err.message}`))
    })
  })
}

export default getFilePath
