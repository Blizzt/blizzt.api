// Dependencies
import jwt from 'jsonwebtoken';
import {ForbiddenError} from 'apollo-server';
import {skip} from 'graphql-resolvers';
import {AuthenticationError} from 'apollo-server-express';

export const createToken = async (user, secret, expiresIn) => {
  return await jwt.sign(user, secret, {
    expiresIn,
  });
};

export const findUserByToken = async token => {
  return await jwt.verify(token, process.env.SECRET);
}

export const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

export const generateAuthCode = () => Math.floor(10000 + Math.random() * 90000);

export const isAuthenticated = (parent, args, {me}) =>
  me ? skip : new ForbiddenError('You do not have access to this functionality.');

export const isPrivateResponse = (parent, args, {me}) =>
  me ? skip : null;
