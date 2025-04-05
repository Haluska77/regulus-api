import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const homeResponseSchema = z
  .object({
    outdoorTemperature: z.string().optional(),
    zone1SummerMode: z.boolean().optional(),
    zone2SummerMode: z.boolean().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of home source',
  });

export type HomeResponseData = z.infer<typeof homeResponseSchema>;
