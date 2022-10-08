import { promises as fsPromises } from 'fs';

export const fileExists = async (path: string) => {
  try {
    await fsPromises.readFile(path);
    return true;
  } catch (error) {
    return false;
  }
};
