import path from 'path';
import { Request, Response } from 'express';
import { ImageQuery } from '../types';
import { fileExists } from './images';
import { isNaN } from 'lodash';

const logger = (req: Request, res: Response, next: VoidFunction): void => {
  const getImageFromDisck = async () => {
    const { filename, width, height } = req.query as ImageQuery;
    // dimensions
    const widthInt = width ? parseInt(width) : 200;
    const heightInt = height ? parseInt(height) : 200;
    if (isNaN(widthInt) || isNaN(heightInt)) {
      console.log('Erro: Invalid image dimensions');
      res.send('Invalid image dimensions');
      return;
    }
    const outputFilePath = path.join(
      __dirname,
      '../assets/thumb',
      `${filename}_thumb_${width}x${height}.jpg`
    );
    const imageExists = await fileExists(outputFilePath);
    if (imageExists) {
      console.log('New image created: ', false);
      res.sendFile(outputFilePath);
    } else {
      console.log('New image created: ', true);
      next();
    }
  };
  getImageFromDisck();
};

export default logger;
