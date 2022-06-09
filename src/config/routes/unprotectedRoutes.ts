import Router from "koa-router";
import * as controller from "../../controllers";
import validator, { Joi } from 'koa-context-validator';

const unprotectedRoutes = new Router();

unprotectedRoutes.post(
  '/users/register',
  validator({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),
  controller.users.create
);

unprotectedRoutes.post(
  '/users/login',
  validator({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),
  controller.users.login
);

export { unprotectedRoutes };
