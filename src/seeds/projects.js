// Dependencies
import models from '../models';

const data = [
  {
    id: '50966076-310f-4f59-983f-b592f3b77fd3',
    ownerId: 1,
    categoryId: 1,
    isPublic: true,
    title: 'Need for Speed: Heat',
    description: 'Need for Speed Heat is a racing game set in an open world environment called Palm City, a fictionalised version of the city Miami, Florida and its surrounding area.',
    photoUrl: 'https://i0.wp.com/wallpaperaccess.com/full/2529113.jpg',
  },
];

const details = [
  {
    id: '50966076-310f-4f59-983f-b592f3b77fd3'
  }
]


module.exports = function() {
  return new Promise((resolve) => {
    models.Project.bulkCreate(data).then(() => {
      models.ProjectDetail.bulkCreate(details).then(() => {
        resolve(true);
      });
    });
  });
};

