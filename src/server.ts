import dotEnv from 'dotenv';
dotEnv.config();
import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import json from 'koa-json';
import koaBody from 'koa-body';
import axios from 'axios';
import jwt from "jsonwebtoken";
// @ts-ignore
import connectDB from './config/db';
import auth from './auth'
import User from './models/User';

const app = new Koa();
const router = new Router();
app.use(json());
app.use(koaBody());

// Connect Database
connectDB();

// Error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err: any) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message
        };
    }
});

// Homepage Swiper Jumbotron endpoint
router.get('/nytimes-bestsellers', async (ctx) => {
    const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-nonfiction.json?api-key=${process.env.NYTIMES_API_KEY}`
    );
    ctx.body = data;
});

// Check to see if token is still good.
router.get('/user', auth, async (ctx: any) => {
    const user = ctx.state.user;
    ctx.body = {
        user
    };
});

router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body;
    let user = await User.findOne({ email });
    if (!user) {
        ctx.status = 401;
        ctx.body = {
            error: 'Invalid email or password'
        };
        return;
    }
    const isMatch = password === user.password;
    if (!isMatch) {
        ctx.status = 401;
        ctx.body = {
            error: 'Invalid email or password'
        };
        return;
    }
    const token = jwt.sign({
        userId: user.id,
    }, process.env.JWT_SECRET);

    user = {
        userId: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
    };

    ctx.body = {
        user,
        token
    };
});

router.post('/register', async (ctx) => {
    const { first_name, last_name, email, password }: any = ctx.request.body;

    let user = await User.findOne({ email });
    if (user) {
        ctx.status = 400;
        ctx.body = {
            error: 'User already exists'
        };
        return;
    }

    const newUser = new User({
        first_name,
        last_name,
        email,
        password
    });

    await newUser.save();

    user = {
        userId: newUser.id,
        first_name,
        last_name,
    };

    const token = jwt.sign({
        user
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });



    ctx.status = 201;
    ctx.body = {
        message: 'new user made',
        user,
        token
    };
});


app.use(cors({ origin: '*' }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 5003, () =>
  console.log('Server running on port 5003.')
);