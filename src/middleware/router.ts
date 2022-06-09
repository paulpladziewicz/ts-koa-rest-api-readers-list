import Router from 'koa-router';
import auth from './auth';
import AuthController from '../controllers/AuthController';
import NYTimesController from "../controllers/NYTimesController";

const router = new Router({ prefix: '/api' });

router.get('/', async (ctx) => {
  ctx.body = { message: 'Readers List API is healthy.' };
});

router
  .get('/user', auth, AuthController.user)
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .post('/nytimes-bestsellers', auth, NYTimesController.bestSellers);

export default router;
