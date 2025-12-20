const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const assetsDir = path.join(__dirname, 'assets');
const targetSize = 300; // Smaller size

async function resizeImages() {
    try {
        const files = fs.readdirSync(assetsDir);

        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i) && !file.startsWith('logo')) {
                const filePath = path.join(assetsDir, file);
                console.log(`Resizing ${file}...`);

                const image = await Jimp.read(filePath);

                // Resize to cover 300x300, maintaining aspect ratio
                image.cover({ w: targetSize, h: targetSize });

                await image.write(filePath);
                console.log(`Resized ${file} to ${targetSize}x${targetSize}`);
            }
        }
        console.log('All images resized successfully!');
    } catch (error) {
        console.error('Error resizing images:', error);
    }
}

resizeImages();
