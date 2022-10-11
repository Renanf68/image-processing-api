import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

describe('Test image endpoint', () => {
  it('Response type is image/jpeg', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&heigth=200'
    );
    expect(response.type).toBe('image/jpeg');
  });
  it('Logger sends correct message when query is invalid', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=AAA&heigth=200'
    );
    expect(response.text).toBe('Invalid image dimensions');
  });
});
