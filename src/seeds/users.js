// Dependencies
import models from '../models';
import {userRoles} from "../types/user";

const data = [
  {
    address: '0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852',
    username: 'gebo96',
    photoUrl: 'https://media-exp1.licdn.com/dms/image/C4D03AQHevZTG3pgBGw/profile-displayphoto-shrink_800_800/0/1597951599272?e=1632355200&v=beta&t=tdFFhcM5b1Ss4Q20AtJl0AskgcXCvbLBRH1s80cQy1Q',
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
