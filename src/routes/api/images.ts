import path from 'path';
import express from 'express';
import sharp from 'sharp';
import { fileExists } from '../../utils';

// send image thumb if exists OK
// or create new file, with w and h especified in the query (200x200) OK

// input format: filename.jpg OK
// output format: filename_thumb.jpg OK

const images = express.Router();

images.get('/', async (req, res) => {
  // query
  const { filename, width, height } = req.query;
  const widthInt = typeof width === 'string' ? parseInt(width) : 200;
  const heightInt = typeof height === 'string' ? parseInt(height) : 200;
  // helpers
  const inputPath = path.join(
    __dirname,
    '../../assets/full',
    `${filename}.jpg`
  );
  const outputFilePath = path.join(
    __dirname,
    '../../assets/thumb',
    `${filename}_thumb.jpg`
  );
  // cached
  try {
    const isCached = await fileExists(outputFilePath);
    console.log('isCached: ', isCached);
    if (isCached) {
      res.sendFile(outputFilePath);
      return;
    }
    // resizing
    sharp(inputPath)
      .resize(widthInt, heightInt)
      .toFile(outputFilePath, (err) => {
        if (err) console.log(err);
        // response
        res.sendFile(outputFilePath);
      });
  } catch (error) {
    console.log(error);
  }
});

export default images;
