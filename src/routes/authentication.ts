import Router from 'koa-router';
import auth from '../middleware/auth';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const authRouter = new Router();

// Check to see if token is still good.
authRouter.get('/user', auth, async (ctx: any) => {
  const userId = ctx.state.userId;
  ctx.body = {
    userId
  };
});

authRouter.post('/login', async (ctx) => {
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
  const token = jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET as string
  );

  user = {
    userId: user.id,
    first_name: user.first_name,
    last_name: user.last_name
  };

  ctx.body = {
    user,
    token
  };
});

authRouter.post('/register', async (ctx) => {
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
    last_name
  };

  const token = jwt.sign(
    {
      user
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h'
    }
  );

  ctx.status = 201;
  ctx.body = {
    message: 'new user made',
    user,
    token
  };
});

export default authRouter;
