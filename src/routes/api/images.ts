import express from 'express';
import { getProcessedImage } from '../../utils';

// send image thumb if exists OK
// or create new file, with w and h especified in the query (200x200) OK

// input format: filename.jpg OK
// output format: filename_thumb.jpg OK

const images = express.Router();

type Query = {
  filename?: string;
  width?: string;
  height?: string;
};

images.get('/', async (req, res) => {
  // query
  const { filename, width, height } = req.query as Query;
  const processedImage = await getProcessedImage(filename, width, height);
  if (processedImage) res.sendFile(processedImage);
  else res.send(400);
});

export default images;
