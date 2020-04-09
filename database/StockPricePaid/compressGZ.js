const stream = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

async function run() {
    try {
        await pipeline(
            fs.createReadStream('The.Matrix.1080p.mkv'),
            zlib.createGzip(),
            fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
        );
        console.log('Pipeline succeeded');
    } catch (err) {
        console.error('Pipeline failed', err);
    }
}