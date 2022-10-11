import path from 'path';
import _ from 'lodash';
import { fileExists, resizeImage, getProcessedImage } from '../../utils/images';

const testInputPath = path.join(__dirname, '../../assets/full/fjord.jpg');
const testOutputPath = path.join(
  __dirname,
  '../../assets/thumb/fjord_thumb.jpg'
);
const placeholderPath = path.join(
  __dirname,
  '../../assets/thumb/not_found_thumb.jpg'
);

describe('Test utils functions', () => {
  it('fileExists return true when file exists', async () => {
    const exists = await fileExists(placeholderPath);
    expect(exists).toBe(true);
  });
  it('resizeImage return correct infos', async () => {
    const info = await resizeImage(testInputPath, 200, 200, testOutputPath);
    const basicInfo = _.pick(info, ['format', 'width', 'height']);
    expect(basicInfo).toEqual({
      format: 'jpeg',
      width: 200,
      height: 200,
    });
  });
  it('getProcessedImage return correct image path', async () => {
    const response = await getProcessedImage('fjord', '200', '200');
    const pathEnd = response?.split('/dist')[1];
    expect(pathEnd).toEqual('/assets/thumb/fjord_thumb_200x200.jpg');
  });
});
