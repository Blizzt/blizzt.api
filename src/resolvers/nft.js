// Dependencies
import {ApolloError} from 'apollo-server-express';
import isAfter from 'date-fns/isAfter';

// Types
import {nftTypes} from '../types/nft';
import {offerTypesId, offerStatesId} from '../types/transfer';
import {getAvailableNFTs} from '../models/user';

export default {
  Query: {
    nft: async (parent, {projectId, nftId}, {models}) => {
      return models.NFT.findOne({
        where: {
          projectId,
          nftId,
        },
      });
    },
    nfts: async (parent, args, {models}) => {
      return models.NFT.findAll();
    },
  },
  Mutation: {
    /**
     * @function mintNFT():
     * @description Controller in charge of minting an NFT in the database.
     * @param parent Contextual Info
     * @param type Type of NFT. (nftTypes)
     * @param projectId Id of the project associated with the NFT.
     * @param nftId Id of the NFT within the blockchain
     * @param collectionAddress Blockchain collection id
     * @param metadata Metadata for off-chain caching
     * @param IPFSAddress IPFS address to collect data on the blockchain.
     * @param amount Amount of NFT to mint
     * @param models Total models in architecture
     * @param me Authenticated user making the call
     * @returns {Promise<ApolloError|*>}
     */
    mintNFT: async (
      parent, {
        nftId,
        amount,
        metadata,
        projectId,
        IPFSAddress,
        collectionAddress,
        type = nftTypes.OBJECT,
      },
      {models, me},
    ) => {
      const isTheOwnerOfTheProject = await models.Project.findByIdAndOwner(projectId, me.id);

      if (!isTheOwnerOfTheProject) {
        return new ApolloError('Only the project owner can mint NFTS', '20001');
      }

      // We detect if the NFT exists.
      const nftExists = await models.NFT.exists(nftId, projectId);

      if (nftExists) {
        return new ApolloError('This NFT already exists', '20000')
      }

      // Edit Project with Collection Address
      await models.Project.edit(projectId, {
        collectionAddress,
      });

      // We create the project and return it to the client.
      const nft = await models.NFT.create({
        type,
        nftId,
        metadata,
        projectId,
        IPFSAddress,
        creatorId: me.id,
        mintedAmount: amount,
      });

      if (nft) {
        await models.Transfer.sendTo(null, 0, nft.creatorId, nft.mintedAmount);
      }
    },

    /**
     * @function putOnRentNFT():
     * @description Create a sale offer within the platform.
     * @param parent
     * @param nftId NFT ID on Blockchain
     * @param price Offer price
     * @param amount NFTS quantity
     * @param message (Signing): Encrypted message in metamask to validate the transaction.
     * @param currencyId Unit with which the sale is marketed.
     * @param projectId Associated Project ID
     * @param signature (Signing): Signature fingerprint in metamask.
     * @param until Determine until the maximum period of time to rent the NFT.
     * @param models List all available models from the database.
     * @param me Authenticated user who makes the request.
     * @returns {Promise<ApolloError|*>}
     */
    putOnRentNFT: async (
      parent, {
        nftId,
        projectId,
        offer: {
          price,
          amount,
          currencyId,
          until,
        },
        signature: {
          message,
          fingerprint,
        },
      },
      {models, me},
    ) => {
      if (!me) {
        return new ApolloError('You must be authenticated to be able to execute this function', '10000');
      }

      // Get the current project.
      const project = await models.Project.findById(projectId);
      if (!project) {
        return new ApolloError(`Project ID does not exist ${projectId}`, '20000');
      }

      // Get the NFT in the database
      const nft = await models.NFT.exists(nftId, projectId);
      if (!nft) {
        return new ApolloError(`This project does not have an NFT id ${nftId}`, '20000')
      }

      const nftAvailable = await getAvailableNFTs(models, me.id, nftId, projectId);

      if (amount > nftAvailable) {
        return new ApolloError(`You don't have enough NTFS to sell, you currently have ${nftAvailable}`, '20000');
      }

      return models.Offer.create({
        nftId,
        price,
        message,
        currencyId,
        projectId,
        fingerprint,
        maxExpirationDate: until,
        userId: me.id,
        quantity: amount,
        type: offerTypesId.RENT,
      });
    },

    /**
     * @function putOnSaleNFT():
     * @description Create a sale offer within the platform.
     * @param parent
     * @param nftId NFT ID on Blockchain
     * @param price Offer price
     * @param amount NFTS quantity
     * @param message (Signing): Encrypted message in metamask to validate the transaction.
     * @param currency Unit with which the sale is marketed.
     * @param projectId Associated Project ID
     * @param signature (Signing): Signature fingerprint in metamask.
     * @param isBundlePack Determine if it is an NTFS package or individual pieces.
     * @param models List all available models from the database.
     * @param me Authenticated user who makes the request.
     * @returns {Promise<ApolloError|*>}
     */
    putOnSaleNFT: async (
      parent, {
        nftId,
        projectId,
        offer: {
          price,
          amount,
          currencyId,
          isBundlePack,
        },
        signature: {
          message,
          fingerprint,
        },
      },
      {models, me},
    ) => {
      if (!me) {
        return new ApolloError('You must be authenticated to be able to execute this function', '10000');
      }

      // Get the current project.
      const project = await models.Project.findById(projectId);
      if (!project) {
        return new ApolloError(`Project ID does not exist ${projectId}`, '20000');
      }

      // Get the NFT in the database
      const nft = await models.NFT.exists(nftId, projectId);
      if (!nft) {
        return new ApolloError(`This project does not have an NFT id ${nftId}`, '20000')
      }

      const nftAvailable = await getAvailableNFTs(models, me.id, nftId, projectId);

      if (amount > nftAvailable) {
        return new ApolloError(`You don't have enough NTFS to sell, you currently have ${nftAvailable}`, '20000');
      }

      return models.Offer.create({
        nftId,
        price,
        message,
        currencyId,
        projectId,
        fingerprint,
        isBundlePack,
        userId: me.id,
        quantity: amount,
        type: offerTypesId.SELL,
      });
    },

    /**
     * @function buyNFT():
     * @description Triggers the purchase of an NFT.
     * @param parent
     * @param offerId Offer id
     * @param models List all available models from the database.
     * @param me Authenticated user who makes the request.
     * @returns {Promise<ApolloError>}
     */
    buyNFT: async (
      parent, {
        offerId,
        amount,
      },
      {models, me},
    ) => {
      if (!me) {
        return new ApolloError('You must be authenticated to be able to execute this function', '10000');
      }

      // Get the current project.
      const offer = await models.Offer.findById(offerId);

      if (!offer) {
        return new ApolloError(`Offer ID does not exist ${offerId}`, '20000');
      }

      if (offer.state !== offerStatesId.ACTIVE) {
        return new ApolloError('This offer is inactive', '20000');
      }

      if (offer.userId === me.id) {
        return new ApolloError('You cannot buy an NFT offered by yourself.', '20000');
      }

      if (amount > offer.quantity) {
        return new ApolloError('The quantity of NFT requested exceeds the quantity available from the offer', '20000');
      }

      // Record the transfer in the database.
      const transfer = models.Transfer.sendTo(offer.nftId, offer.projectId, offer.userId, me.id, offer.price, amount);
      if (!transfer) {
        return new ApolloError('The transfer could not be completed', '20000');
      }

      // If it is a package, everything is sold.
      if (offer.isBundlePack) {
        return models.Offer.edit(offer.id, {
          state: offerStatesId.INACTIVE,
        });
      }
      else {
        // Calculate the new quantity of items available in the offer.
        const quantityAvailable = offer.quantity - amount;

        return models.Offer.edit(offer.id, {
          ...(quantityAvailable === 0 && {state: offerStatesId.INACTIVE}),
          quantity: quantityAvailable,
        });
      }
    },

    /**
     * @function putOnRentNFT():
     * @description Triggers the renting of an NFT.
     * @param parent
     * @param offerId Offer id
     * @param amount Amount of items.
     * @param until Time limit to return the NFT.
     * @param models List all available models from the database.
     * @param me Authenticated user who makes the request.
     * @returns {Promise<ApolloError>}
     */
    rentNFT: async (
      parent, {
        offerId,
        amount,
        until,
      },
      {models, me},
    ) => {
      if (!me) {
        return new ApolloError('You must be authenticated to be able to execute this function', '10000');
      }

      // Get the current project.
      const offer = await models.Offer.findById(offerId);

      if (!offer) {
        return new ApolloError(`Offer ID does not exist ${offerId}`, '20000');
      }

      if (offer.type !== offerTypesId.RENT) {
        return new ApolloError('This offer is not offering to rent', '20000');
      }

      if (offer.state !== offerStatesId.ACTIVE) {
        return new ApolloError('This offer is inactive', '20000');
      }

      if (offer.userId === me.id) {
        return new ApolloError('You cannot rent an NFT offered by yourself.', '20000');
      }

      if (amount > offer.quantity) {
        return new ApolloError('The quantity of NFT requested exceeds the quantity available from the offer', '20000');
      }

      const currentDate = new Date();
      if (isAfter(currentDate, offer.maxExpirationDate)) {
        return new ApolloError('The offer is already expired.', '2000');
      }

      if (isAfter(until, offer.maxExpirationDate)) {
        return new ApolloError('The rental period exceeds the maximum offered', '20000');
      }

      const rent = models.Rent.create({
        state: offerStatesId.ACTIVE,
        nftId: offer.nftId,
        projectId: offer.projectId,
        userId: me.id,
        offerId: offer.userId,
        quantity: amount,
        price: offer.price,
        currency: offer.currency,
        until,
      })

      if (!rent) {
        return new ApolloError('This NFT could not be rented.', '20000');
      }

      // Record the transfer in the database.
      const transfer = models.Transfer.sendTo(offer.nftId, offer.projectId, offer.userId, me.id, offer.price, amount);
      if (!transfer) {
        return new ApolloError('The transfer could not be completed', '20000');
      }

      // Calculate the new quantity of items available in the offer.
      const quantityAvailable = offer.quantity - amount;

      return models.Offer.edit(offer.id, {
        ...(quantityAvailable === 0 && {state: offerStatesId.INACTIVE}),
        quantity: quantityAvailable,
      });
    },
  },

  NFT: {
    project: async (nft, args, {models}) => {
      return models.Project.findById(nft.projectId);
    },


    latestOffers: async (nft, args,  {models, me}) => {
      const forRent = await models.Offer.findLatestAvailable(me ? me.id : null, nft.nftId, nft.projectId, offerTypesId.RENT);
      const forSale = await models.Offer.findLatestAvailable(me ? me.id: null, nft.nftId, nft.projectId, offerTypesId.SELL);

      return {
        forRent,
        forSale,
      }
    },

    forRent: async (nft, args,  {models}) => {
      return models.Offer.findAvailable(nft.nftId, nft.projectId, offerTypesId.RENT);
    },

    forSale: async (nft, args,  {models}) => {
      return models.Offer.findAvailable(nft.nftId, nft.projectId, offerTypesId.SELL);
    },

    acquired: async (nft, args,  {models, me}) => {
      if (!me) {
        return 0;
      }

      return getAvailableNFTs(models, me.id, nft.nftId, nft.projectId);
    },
  },
};
