import jwt from 'jsonwebtoken';
import Koa from 'koa';

interface DecodedPayload {
  userId: string;
  iat: number;
}

const auth = async (ctx: Koa.Context, next: Function) => {
  if (!ctx.request.header.authorization) {
    return ctx.throw(401, 'No authorization header');
  }
  // Removing 'Bearer ' portion of header auth
  let token = ctx.header?.authorization?.substring(7);

  if (!token) {
    ctx.status = 401;
    ctx.body = {
      message: 'Invalid credentials'
    };
    return;
  }
  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as DecodedPayload;
    ctx.state.userId = decoded.userId;
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      message: 'Invalid credentials'
    };
    return;
  }
  await next();
};

export default auth;
