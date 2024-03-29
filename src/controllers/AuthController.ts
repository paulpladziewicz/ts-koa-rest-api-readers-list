import Koa from 'koa';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default {
  async user(ctx: Koa.Context) {
    const userId = ctx.state.userId;
    ctx.body = {
      userId
    };
  },

  async login(ctx: Koa.Context) {
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
  },

  async register(ctx: Koa.Context) {
    const { first_name, last_name, email, password }: any = ctx.request.body;

    let user = await User.findOne({ email });
    if (user) {
      ctx.status = 400;
      ctx.body = {
        error: 'User already exists'
      };
      return;
    }

    let newUser = new User({
      first_name,
      last_name,
      email,
      password
    });

    await newUser.save();

    newUser = await User.findOne({ email });

    user = {
      userId: newUser.id,
      first_name,
      last_name
    };

    const token = jwt.sign(
      {
        userId: newUser.id
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
  }
};
