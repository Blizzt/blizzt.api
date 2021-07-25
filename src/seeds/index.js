
// Seeds Files
import Users from './users';
import Categories from './categories';
import Projects from './projects';
import NFTs from './nfts';

// Utils
import Console from '../utils/bash/console';

export default function() {
  return new Promise((resolve) => {
    Promise.all([
      Users(),
      Categories(),
    ])
      .then(() => {
        return Promise.all([
          Projects(),
        ]);
      })
      .then(() => {
        return Promise.all([
          NFTs()
        ]);
      }).then(() => {
      Console.success('The database has been filled in automatically');
      resolve(true);
    });
  });
}
