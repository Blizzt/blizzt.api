// Dependencies
import AWS from 'aws-sdk';

const endpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint,
});

export const uploadFileToS3 = (photo) => {
  return new Promise(async (resolve, reject) => {
    if (!photo) {
      return reject('A file was not detected in the upload function.')
    }

    const file = await photo;

    const {createReadStream, filename} = file
    const fileStream = await createReadStream();

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: filename,
      Body: fileStream,
      ACL: 'public-read'
    };

    const result = await s3.upload(uploadParams).promise();

    return resolve(result.Location);
  })
}
