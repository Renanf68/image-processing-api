import path from 'path';
import { promises as fsPromises } from 'fs';
import sharp, { OutputInfo } from 'sharp';

const placeholderPath = path.join(
  __dirname,
  '../assets/thumb',
  'not_found_thumb.jpg'
);

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
): Promise<OutputInfo | string> => {
  try {
    const process = sharp(inputPath).resize(width, height);
    return process.toFile(outputPath);
  } catch (error) {
    console.log(error);
    // return image placeholder with message 'image not found'
    return placeholderPath;
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
    `${filename}_thumb_${width}x${height}.jpg`
  );
  try {
    // check if image already exists
    const imageExists = await fileExists(outputFilePath);
    if (imageExists) {
      return outputFilePath;
    }
    // image resizing
    await resizeImage(inputPath, widthInt, heightInt, outputFilePath);
    return outputFilePath;
  } catch (error) {
    console.log(error);
    // return image placeholder with message 'image not found'
    return placeholderPath;
  }
};
