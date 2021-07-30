// Dependencies
import models from '../models';
import {userRoles} from "../types/user";

const data = [
  {
    address: '000000000000000000000000000000000000000000',
    username: 'Blizzt Holders',
    photoUrl: 'https://64.media.tumblr.com/24be07dd685c85a2a276c6aefa3be4c7/f49411532aabb1b5-a1/s250x400/fd776438744e7f14d49ddebb316af6ed618ec7a0.png',
    role: userRoles.ADMINISTRATOR,
  },
  {
    address: '0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852',
    username: 'gebo96',
    photoUrl: 'https://64.media.tumblr.com/24be07dd685c85a2a276c6aefa3be4c7/f49411532aabb1b5-a1/s250x400/fd776438744e7f14d49ddebb316af6ed618ec7a0.png',
    role: userRoles.ADMINISTRATOR,
  },
];


module.exports = function() {
  return new Promise((resolve) => {
    models.User.bulkCreate(data).then(() => {
      resolve(true);
    });
  });
};
