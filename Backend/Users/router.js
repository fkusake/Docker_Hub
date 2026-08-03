import express from 'express';
import UserController from './controller.js';

const userRouter = express.Router();

const instance = new UserController();

userRouter.post('/signup', (req, res, next) => {
  instance.signup(req, res, next);
});

userRouter.post('/signin', (req, res, next) => {
  instance.signin(req, res, next);
});

export default userRouter;
