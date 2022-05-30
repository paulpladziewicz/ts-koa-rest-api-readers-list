import Router from 'koa-router'

import authRouter from './authentication'
import nytimesRouter from './nytimes'

// not sure if { prefix: '/api' } option will be needed yet
const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/', async (ctx) => {
    ctx.body = {message: 'Readers List API is healthy.'};
});

const nestedRoutes = [authRouter, nytimesRouter]
for (let router of nestedRoutes) {
    apiRouter.use(router.routes(), router.allowedMethods())
}

export default apiRouter;