// Dependencies
import {uuid} from "uuidv4";
import {ApolloError} from "apollo-server-express";

// Services
import {uploadFileToS3} from "../services/aws/s3";

const injectAssoc = models => [
  {
    model: models.User,
    as: 'creator',
  }, {
    model: models.NFT,
    as: 'nfts',
  }, {
    model: models.Category,
    as: 'category',
  }
];

export default {
  Query: {
    projects: async (parent, {
      order = 'DESC'
    }, {models}) => {

      return models.Project.findAll({
        where: {
          isPublic: true,
        },
        include: injectAssoc(models),
        order: [
          ['id', order],
        ],
      });
    },
    project: async (parent, {
      id
    }, {models}) => {
      return models.Project.findOne({
        where: {
          id,
        },
        include: injectAssoc(models)
      });
    }
  },
  Mutation: {
    /**
     * @function createProject()
     * @description Proceed to create a new project within Blizzt.
     *
     * @param title Title of the project
     * @param description Short description of the project
     * @param categoryId Category id (must exist in the database)
     * @param photo Photo file to upload to S3
     *
     * @param models All architecture models
     * @param me Header authenticated information
     * @returns {Promise<ApolloError|*>}
     */
    createProject: async(parent,
      {
        title,
        description,
        categoryId,
        photo,
      },
      {models, me},
    ) => {
      // We verify the identity
      if (!me) {
        return new ApolloError('You must be connected to ethereum to be able to create projects.', '2000')
      }

      // We upload the file to AWS
      const photoUrl = await uploadFileToS3(photo);
      const projectId = uuid();

      // We create the project and return it to the client.
      const project = await models.Project.create({
        id: projectId,
        title,
        ownerId: me.id,
        description,
        photoUrl,
        categoryId,
      });

      await models.ProjectDetail.create({
        id: projectId,
      });

      return project;
    },

    /**
     * @function editProject
     * @description Edit the project
     *
     * @param parent
     * @param projectId Project identifier
     * @param data Information to be changed
     *
     * @param models All architecture models
     * @param me Header authenticated information
     * @returns {Promise<ApolloError>}
     */
    editProject: async(parent, {id, data}, {models, me}) => {
      if (!me) {
        return new ApolloError('You must be connected to ethereum to be able to edit projects', '2000')
      }

      const project = await models.Project.findByIdAndOwner(id, me.id);

      if (!project) {
        return new ApolloError('You are not authorized to change data in this project.', '2001')
      }

      if (data.hasOwnProperty('details')) {
        await models.ProjectDetail.edit(id, data.details);
      }

      delete data.details;

      return await models.Project.edit(id, data);
    },
  },

  Project: {
    category: async (project, args, {models}) => {
      return models.Category.findById(project.categoryId);
    },

    details: async (project, args, {models}) => {
      return models.ProjectDetail.findById(project.id);
    },

    creator: async (project, args, {models}) => {
      return models.User.findOne({
        where: {
          id: project.ownerId,
        },
      });
    },
  },
};
