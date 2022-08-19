import Router from 'koa-router';
import auth from './auth';
import AuthController from '../controllers/AuthController';
import NYTimesController from "../controllers/NYTimesController";
import ListController from "../controllers/ListController";

const router = new Router({ prefix: '/api' });

router.get('/', async (ctx) => {
  ctx.body = { message: 'Readers List API is healthy.' };
});

router
  .get('/user', auth, AuthController.user)
  .post('/login', AuthController.login)
  .post('/register', AuthController.register);

router
    .get('/nytimes-bestsellers', NYTimesController.bestSellers);

router
    .get('/booklist', auth, ListController.getAllBooksByUserId)
    .post('/booklist', auth, ListController.addBookToList)
    .put('/booklist/:bookId', auth, ListController.updateBookOnList)
    .delete('/booklist/:bookId', auth, ListController.deleteBookOnList)

export default router;
