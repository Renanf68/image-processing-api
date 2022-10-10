import path from 'path';
import { Request, Response } from 'express';
import { ImageQuery } from '../types';
import { fileExists } from './images';

const logger = (req: Request, res: Response, next: VoidFunction): void => {
  const checkImageProcessing = async () => {
    const { filename, width, height } = req.query as ImageQuery;
    const outputFilePath = path.join(
      __dirname,
      '../assets/thumb',
      `${filename}_thumb_${width}x${height}.jpg`
    );
    const imageExists = await fileExists(outputFilePath);
    console.log('New image created: ', !imageExists);
  };
  checkImageProcessing();
  next();
};

export default logger;
