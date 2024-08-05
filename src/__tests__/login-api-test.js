const request = require('supertest');
const app = require('../login-api');

describe('POST /login', () => {
  it('should return 400 if username or password is missing', async () => {
    const response = await request(app).post('/login').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Missing username or password' });

    const responseWithNoPassword = await request(app)
      .post('/login')
      .send({ username: 'testuser' });
    expect(responseWithNoPassword.status).toBe(400);
    expect(responseWithNoPassword.body).toEqual({ message: 'Missing username or password' });

    const responseWithNoUsername = await request(app)
      .post('/login')
      .send({ password: 'testpassword' });
    expect(responseWithNoUsername.status).toBe(400);
    expect(responseWithNoUsername.body).toEqual({ message: 'Missing username or password' });
  });

  it('should return 200 if username and password are correct', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'testpassword'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Login successful' });
  });

  it('should return 401 if username or password is incorrect', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'wrongpassword'
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });

    const responseWithWrongUsername = await request(app).post('/login').send({
      username: 'wronguser',
      password: 'testpassword'
    });
    expect(responseWithWrongUsername.status).toBe(401);
    expect(responseWithWrongUsername.body).toEqual({ message: 'Invalid credentials' });
  });
});
