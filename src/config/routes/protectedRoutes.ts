import Router from "koa-router";
import * as controller from "../../controllers";
import validator, { Joi } from 'koa-context-validator';

const protectedRoutes = new Router();

protectedRoutes.get(
  '/users',
  validator({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),
  controller.users.create
);

export { protectedRoutes };
