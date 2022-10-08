import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test main api endpoint', () => {
  it('Response status is 200', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});
