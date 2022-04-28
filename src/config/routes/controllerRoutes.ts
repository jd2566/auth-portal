import Router from "koa-router";
import * as controller from "../../controllers";
import validator, { Joi } from 'koa-context-validator';

const usersRouter = new Router();

usersRouter.post(
  '/users',
  validator({
    params: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),
  controller.users.create
);

export { usersRouter };
