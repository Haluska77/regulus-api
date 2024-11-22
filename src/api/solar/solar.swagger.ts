import { solarRequestBodySchema, solarResponseSchema } from './solarSchemas';

export const solarPath = {
  '/solar': {
    get: {
      tags: ['Sources'],
      summary: 'Retrieve data from Solar',
      responses: {
        200: {
          description: 'Solar monitor',
          content: {
            'application/json': {
              schema: solarResponseSchema,
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
      },
    },
    patch: {
      tags: ['Sources'],
      summary: 'Update Solar',
      requestBody: {
        content: {
          'application/json': {
            schema: solarRequestBodySchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Solar updated',
          content: {
            'application/json': {
              schema: solarResponseSchema,
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};