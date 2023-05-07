const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Health routes', () => {
  describe('GET /api/health', () => {
    test('should return 200 and successfully return healthcheck object', async () => {
      const res = await request(app).get('/api/health').send().expect(httpStatus.OK);

      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
});
