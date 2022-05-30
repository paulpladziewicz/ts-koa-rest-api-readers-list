import auth from './auth';
import { createMockContext } from '@shopify/jest-koa-mocks';

describe('auth middleware', () => {
  it('should return 401 if no token', async () => {
    const ctx = createMockContext();

    await auth(ctx, () => {});

    expect(ctx.throw).toBeCalledWith(401, 'No authorization header');
  });
});
