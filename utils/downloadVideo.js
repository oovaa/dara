import { spawn } from "child_process";
import path from "path";
import getFilePath from "./getFilePath.js";

const download = async (url) => {
    return new Promise((resolve, reject) => {
        const outputDir = 'downloads';
        const outputTemplate = '%(title)s.%(ext)s';
        const outputPath = path.join(outputDir, outputTemplate);

        const child = spawn('yt-dlp', ['-o', outputPath,'-x', url]);

        let stderrData = '';

        child.stdout.on('data', (data) => {
            //console.log(data.toString());
        });

        child.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        child.on('close', async (code) => {
            if (code === 0) {
                const downloadedFilePath = await getFilePath(url)
                const fullPath = downloadedFilePath.replace(/\.[^/.]+$/, '.opus')
                resolve(fullPath);
            } else {
                reject(new Error(`Process exited with code ${code}: ${stderrData}`));
            }
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to start process: ${err.message}`));
        });

    });
}

export default download;