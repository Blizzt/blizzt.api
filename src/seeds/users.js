// Dependencies
import models from '../models';
import {userRoles} from '../types/user';


const data = [
  {
    address: '0x0000000000000000000000000000000000000000',
    username: 'Blizzt.io',
    photoUrl: 'https://64.media.tumblr.com/24be07dd685c85a2a276c6aefa3be4c7/f49411532aabb1b5-a1/s250x400/fd776438744e7f14d49ddebb316af6ed618ec7a0.png',
    role: userRoles.ADMINISTRATOR,
  },
  {
    address: '0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852',
    username: 'gebo96',
    photoUrl: 'https://64.media.tumblr.com/e1da5977fed8776b55dd5f1f23c47699/29c6bcf4442300ee-04/s250x400/ef6d23c4981d0246cf9987853274a833dea539c7.png',
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
