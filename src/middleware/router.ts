import Router from 'koa-router';
import auth from './auth';
import AuthController from '../controllers/AuthController';
import axios from 'axios';

const router = new Router({ prefix: '/api' });

router.get('/', async (ctx) => {
  ctx.body = { message: 'Readers List API is healthy. Hello' };
});

router
  .get('/user', auth, AuthController.user)
  .post('/login', AuthController.login)
  .post('/register', AuthController.register);

router.get('/nytimes-bestsellers', async (ctx) => {
  const { data } = await axios.get(
    `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-nonfiction.json?api-key=${process.env.NYTIMES_API_KEY}`
  );
  ctx.body = data;
});

export default router;
