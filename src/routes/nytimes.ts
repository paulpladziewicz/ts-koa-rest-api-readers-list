import Router from 'koa-router';
import axios from "axios";

const nytimesRouter = new Router();

nytimesRouter.get('/nytimes-bestsellers', async (ctx) => {
    const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-nonfiction.json?api-key=${process.env.NYTIMES_API_KEY}`
    );
    ctx.body = data;
});

nytimesRouter.get('/', async (ctx) => {
    ctx.body = 'worked';
});

export default nytimesRouter;