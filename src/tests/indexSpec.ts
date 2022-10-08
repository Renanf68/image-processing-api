import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

let running = false;

// To skip a test or suite, add x in front of describe or it
// To focus on one test or suite, add f in front of describe or it
fdescribe('Test endpoint repsonses', () => {
  it("gets the api endpoint", async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
})

// methods available
// beforeAll(), afterAll(), beforeEach(), and afterEach()