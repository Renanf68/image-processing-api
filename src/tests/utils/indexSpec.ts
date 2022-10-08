import path from 'path';
import { fileExists, resizeImage, getProcessedImage } from '../../utils';

const testInputPath = path.join(__dirname, '../../assets/full/fjord.jpg');
const testOutputPath = path.join(
  __dirname,
  '../../assets/thumb/fjord_thumb.jpg'
);

describe('Test utils functions', () => {
  it('fileExists return true when file exists', async () => {
    const exists = await fileExists(testOutputPath);
    expect(exists).toBe(true);
  });
  it('resizeImage return correct infos', async () => {
    const info = await resizeImage(testInputPath, 200, 200, testOutputPath);
    expect(info).toEqual({
      format: 'jpeg',
      width: 200,
      height: 200,
      channels: 3,
      premultiplied: false,
      size: 6915,
    });
  });
  it('getProcessedImage return correct image path', async () => {
    const response = await getProcessedImage('fjord', '200', '200');
    const pathEnd = response?.split('/dist')[1];
    expect(pathEnd).toEqual('/assets/thumb/fjord_thumb.jpg');
  });
});
