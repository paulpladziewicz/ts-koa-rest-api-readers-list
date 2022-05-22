import jwt from 'jsonwebtoken';

const auth = async (ctx: any, next: any) => {
    if (!ctx.request.header.authorization) {
        ctx.throw(401, 'No authorization header');
    }
    // Removing 'Bearer ' portion of header auth
    let token = ctx.header.authorization.substring(7);

    if (!token) {
        ctx.status = 401;
        ctx.body = {
            message: 'Invalid credentials'
        };
        return;
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = decoded.user;
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