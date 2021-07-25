// Dependencies
import models from '../models';
import {nftTypes} from "../types/nft";

const data = [
  {
    ownerId: 1,
    projectId: '50966076-310f-4f59-983f-b592f3b77fd3',
    type: nftTypes.OBJECT,
    nftId: 1,
    IPFSAddress: 'ipfs://Qmat8wzXCs6hLPjaiheShTUzyPUtVvEzozGDunsi3hNYW2',
    metadata: '{"name":"Example NFT","description":"This is a example NFT for Blizzt Community","image":"ipfs://QmaSm4akaDiQA4h9tAjjrKhy2cTuT5ZpqtSi3283xodM8v","external_url":"","attributes":[{"display_type":"number","trait_type":"Minted units","value":100},{"display_type":"date","trait_type":"birthday","value":1627183477}]}'
  },
  {
    ownerId: 1,
    projectId: '50966076-310f-4f59-983f-b592f3b77fd3',
    type: nftTypes.OBJECT,
    nftId: 2,
    IPFSAddress: 'ipfs://QmeLEfxg6nPJnw2bKUHv5wPpiomCuk7Wj7CmzR1CGkxFRX',
    metadata: '{"name":"This is an example NFT","description":"Blockchain NFT example","image":"ipfs://QmaSm4akaDiQA4h9tAjjrKhy2cTuT5ZpqtSi3283xodM8v","external_url":"","attributes":[{"display_type":"number","trait_type":"Minted units","value":100},{"display_type":"date","trait_type":"birthday","value":1627182903}]}'
  },
];

module.exports = function() {
  return new Promise((resolve) => {
    models.NFT.bulkCreate(data).then(() => {
      resolve(true);
    });
  });
};

