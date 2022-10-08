import express from 'express';
import { getProcessedImage } from '../../utils';

const images = express.Router();

type Query = {
  filename?: string;
  width?: string;
  height?: string;
};

images.get('/', async (req, res) => {
  const { filename, width, height } = req.query as Query;
  const processedImage = await getProcessedImage(filename, width, height);
  if (processedImage) res.sendFile(processedImage);
  else res.send(400);
});

export default images;
