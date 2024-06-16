import { Hono } from 'hono';
import { registerUser, loginUser } from './auth.controller';
import { zValidator } from '@hono/zod-validator';
import { registerUserSchema, loginUserSchema, usersValidator } from '../validators';
import { SendMail } from '../NodeMail/mail';
import ejs from 'ejs';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', usersValidator, async (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }

    try {
        const data = result.data;
        const templatePath = 'src/NodeMail/emailTemplate.ejs';
        const renderedTemplate = await ejs.renderFile(templatePath, { username: data.username });

        await SendMail(data.email, 'Registration Successful', renderedTemplate);
    } catch (err) {
        console.error(`Error: ${err}`);
        return c.json({ message: 'Failed to send email' }, 500);
    }
}), registerUser);

authRouter.post('/login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), loginUser);
