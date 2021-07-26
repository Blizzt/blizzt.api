// Dependencies
import models from '../models';
import {nftTypes} from "../types/nft";

const data = [
  {
    ownerId: 1,
    projectId: '50966076-310f-4f59-983f-b592f3b77fd3',
    type: nftTypes.OBJECT,
    nftId: 1,
    amount: 100,
    IPFSAddress: 'ipfs://Qmarq7sPhfSduxYXivJJgugtweCqsRjWRGsjad4oefMNRw',
    metadata: '{"name":"Legendary Sword","description":"This is a example NFT for this project.","image":"ipfs://QmaSm4akaDiQA4h9tAjjrKhy2cTuT5ZpqtSi3283xodM8v","external_url":"","attributes":[{"display_type":"number","trait_type":"Minted units","value":100},{"display_type":"date","trait_type":"birthday","value":1627265307}]}'
  },
];

module.exports = function() {
  return new Promise((resolve) => {
    models.NFT.bulkCreate(data).then(() => {
      resolve(true);
    });
  });
};

