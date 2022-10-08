import path from 'path';
import { promises as fsPromises } from 'fs';
import sharp from 'sharp';

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await fsPromises.readFile(path);
    return true;
  } catch (error) {
    return false;
  }
};

export const resizeImage = async (
  inputPath: string,
  width: number,
  height: number,
  outputPath: string
): Promise<sharp.OutputInfo | null> => {
  try {
    const process = sharp(inputPath).resize(width, height);
    return process.toFile(outputPath);
  } catch (error) {
    return null;
  }
};

export const getProcessedImage = async (
  filename?: string,
  width?: string,
  height?: string
): Promise<string | null> => {
  if (!filename) return null;
  // dimensions
  const widthInt = width ? parseInt(width) : 200;
  const heightInt = height ? parseInt(height) : 200;
  // helpers
  const inputPath = path.join(__dirname, '../assets/full', `${filename}.jpg`);
  const outputFilePath = path.join(
    __dirname,
    '../assets/thumb',
    `${filename}_thumb.jpg`
  );
  try {
    // cache
    const isCached = await fileExists(outputFilePath);
    console.log('isCached: ', isCached);
    if (isCached) {
      return outputFilePath;
    }
    // resizing
    await resizeImage(inputPath, widthInt, heightInt, outputFilePath);
    return outputFilePath;
  } catch (error) {
    console.log(error);
    return null;
  }
};
