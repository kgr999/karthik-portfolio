import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const videoDir = path.join(projectRoot, 'public', 'assets', 'videos');
const imageDir = path.join(projectRoot, 'public', 'assets', 'images');

const FFMPEG_PATH = '/opt/homebrew/bin/ffmpeg';
const CWEBP_PATH = '/opt/homebrew/bin/cwebp';

function compressVideos() {
    console.log('--- Starting Video Compression ---');
    if (!fs.existsSync(videoDir)) {
        console.log(`Video directory not found: ${videoDir}`);
        return;
    }

    const files = fs.readdirSync(videoDir);
    const videoExtensions = ['.mp4', '.mov', '.avi'];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (videoExtensions.includes(ext) && !file.startsWith('temp_')) {
            const inputPath = path.join(videoDir, file);
            // We output to a temporary name in the same directory, then replace the original
            const tempFileName = `temp_${path.basename(file, ext)}.mp4`;
            const outputPath = path.join(videoDir, tempFileName);

            const sizeBefore = fs.statSync(inputPath).size;
            console.log(`Compressing ${file} (${(sizeBefore / (1024 * 1024)).toFixed(2)} MB)...`);

            try {
                // Command to compress to h264 MP4 with CRF 28 (very good compression-to-quality ratio)
                const cmd = `"${FFMPEG_PATH}" -y -i "${inputPath}" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 96k -movflags +faststart "${outputPath}"`;
                execSync(cmd, { stdio: 'ignore' });

                const sizeAfter = fs.statSync(outputPath).size;
                console.log(`Finished ${file}. New size: ${(sizeAfter / (1024 * 1024)).toFixed(2)} MB (${((1 - sizeAfter / sizeBefore) * 100).toFixed(1)}% reduction)`);

                // Overwrite the original video file (always outputting to MP4/lowercase ext)
                const finalOutputPath = path.join(videoDir, `${path.basename(file, ext).toLowerCase()}.mp4`);
                fs.renameSync(outputPath, finalOutputPath);

                // If the original file was uppercase (e.g. .MP4 or .MOV), delete it if the name changed
                if (finalOutputPath !== inputPath) {
                    fs.unlinkSync(inputPath);
                }
            } catch (err) {
                console.error(`Failed to compress ${file}:`, err.message);
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
            }
        }
    }
}

function convertImages() {
    console.log('--- Starting Image Conversion to WebP ---');
    if (!fs.existsSync(imageDir)) {
        console.log(`Image directory not found: ${imageDir}`);
        return;
    }

    const imagesToConvert = [
        'da1.png',
        'lincoln_pharma_launch.png',
        'montra_eviator_launch.png',
        'kukutv-logo.png',
        'kukutv-icon.png',
        'admitra.png'
    ];

    for (const file of imagesToConvert) {
        const inputPath = path.join(imageDir, file);
        if (fs.existsSync(inputPath)) {
            const baseName = path.basename(file, path.extname(file));
            const outputPath = path.join(imageDir, `${baseName}.webp`);

            console.log(`Converting ${file} to WebP...`);
            try {
                const cmd = `"${CWEBP_PATH}" -q 80 "${inputPath}" -o "${outputPath}"`;
                execSync(cmd, { stdio: 'ignore' });
                console.log(`Successfully created ${baseName}.webp`);
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err.message);
            }
        }
    }
}

compressVideos();
convertImages();
console.log('--- All media processing complete! ---');
