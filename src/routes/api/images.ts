import express, { Request, Response } from 'express';
import { ImageQuery } from '../../types';
import { getProcessedImage } from '../../utils/images';
import logger from '../../utils/logger';

const images = express.Router();

images.get('/', logger, async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as ImageQuery;
  const processedImage = await getProcessedImage(filename, width, height);
  if (processedImage) res.sendFile(processedImage);
  else res.send('Missing image information');
});

export default images;
