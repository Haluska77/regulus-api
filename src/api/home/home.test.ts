import express from 'express';
import request from 'supertest';
import router from './index';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/homeHappyPathResponse.json';
import { HomeApi } from './homeApi';
import { homeResponseSchema } from './homeSchemas';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('HomeApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/homeHappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const homeApi = new HomeApi();
    const result = await homeApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/home.xml`);

    expect(result).toEqual(happy);
    expect(() => homeResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/home', router);

  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/homeMissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/home');
    expect(res.status).toBe(409);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'outdoorTemperature' could not be found. '__R8267_REAL_.1f' is missing in xml response or 'outdoorTemperature' is mapped to another registry. Pls. contact Regulus provider.`,
    );
  });
});
