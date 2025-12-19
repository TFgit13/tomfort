const JimpLib = require('jimp');
console.log('Jimp exports:', JimpLib);
const Jimp = JimpLib.Jimp || JimpLib;
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = fs.readdirSync(assetsDir).filter(f => f.startsWith('logo_') && f.endsWith('.png'));

async function processImages() {
    console.log('Starting image processing...');
    for (const file of files) {
        const filePath = path.join(assetsDir, file);
        try {
            const image = await Jimp.read(filePath);

            // Target dimensions
            let targetW, targetH;

            if (file === 'logo_tom.png') {
                // Wide box: ~5:3 ratio (e.g. 1000x600)
                targetW = 1000;
                targetH = 600;
            } else {
                // Standard box: ~5:6 ratio (e.g. 500x600)
                targetW = 500;
                targetH = 600;
            }

            console.log(`Processing ${file}: ${image.bitmap.width}x${image.bitmap.height} -> ${targetW}x${targetH}`);

            // Resize to cover (crops excess)
            image.cover({ w: targetW, h: targetH });

            await image.write(filePath);
            console.log(`Saved ${file}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log('Done.');
}

processImages().catch(console.error);
