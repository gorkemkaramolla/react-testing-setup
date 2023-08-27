// mockHandlers.ts
import { rest, RequestHandler, RestContext } from 'msw';

const greetingHandler: RequestHandler = rest.get(
  '/greeting',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ greeting: 'Hello, world!' }));
  }
);

export const handlers: RequestHandler[] = [greetingHandler];
