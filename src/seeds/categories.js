// Dependencies
import models from '../models';
import {categoryTypes} from "../types/category";

const data = [
  {
    name: 'Action',
    type: categoryTypes.GAME
  },
  {
    name: 'Adventure',
    type: categoryTypes.GAME
  },
  {
    name: 'Action & Shooting',
    type: categoryTypes.GAME
  },
  {
    name: 'Strategy',
    type: categoryTypes.GAME
  },
  {
    name: 'RPG',
    type: categoryTypes.GAME
  },
  {
    name: 'Simulator',
    type: categoryTypes.GAME
  }, {
    name: 'Casual',
    type: categoryTypes.GAME
  },
  {
    name: 'Arcade',
    type: categoryTypes.GAME
  },
  {
    name: 'Sports',
    type: categoryTypes.GAME
  }, {
    name: 'Racing',
    type: categoryTypes.GAME
  },
  {
    name: 'Puzzles',
    type: categoryTypes.GAME
  },
  {
    name: 'Horror',
    type: categoryTypes.GAME
  },
  {
    name: 'MMO',
    type: categoryTypes.GAME
  },
  {
    name: 'Fighting',
    type: categoryTypes.GAME
  },
  {
    name: 'Economy',
    type: categoryTypes.GAME
  },
  {
    name: 'VR',
    type: categoryTypes.GAME
  },
  {
    name: 'Fantasy',
    type: categoryTypes.GAME
  },
  {
    name: 'Battle Royale',
    type: categoryTypes.GAME
  },
  {
    name: 'Romance',
    type: categoryTypes.GAME
  },
  {
    name: 'Kids & Family',
    type: categoryTypes.GAME
  },
  {
    name: 'Dance & Rhythm',
    type: categoryTypes.GAME
  },
  {
    name: 'Utilities',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Design and illustration',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Education',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Animation and modeling',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Software Training',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Audio Production',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Video Production',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Video Game Development',
    type: categoryTypes.SOFTWARE
  },
  {
    name: 'Photo Editing',
    type: categoryTypes.SOFTWARE
  }
];




module.exports = function() {
  return new Promise((resolve) => {
    models.Category.bulkCreate(data).then(() => {
      resolve(true);
    });
  });
};

