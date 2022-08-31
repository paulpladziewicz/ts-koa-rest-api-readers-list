import dotEnv from 'dotenv';
dotEnv.config();
import Koa from 'koa';
import cors from '@koa/cors';
import json from 'koa-json';
import koaBody from 'koa-body';
import connectDB from './config/db';
import router from './middleware/router';

const app = new Koa();
app.use(json());
app.use(koaBody());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: '*' }));
}

connectDB();

// Fallback Error Handling
app.use(async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 5003, () =>
  console.log('Server running on port 5003.')
);
