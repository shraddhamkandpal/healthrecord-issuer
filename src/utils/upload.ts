import config from 'utils/config';
const {s3Bucket, s3Region, s3KeyId, s3Secret} = config
var AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: s3KeyId,
    secretAccessKey: s3Secret,
    region: s3Region
});

const upload = (fileName) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: s3Bucket,
        Key: fileName.name, // File name you want to save as in S3
        Body: fileName
    };

    // Uploading files to the bucket
    var s3link = s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        return data.Location;
    });
    return 'https://'+s3Bucket+'.s3.'+s3Region+'.amazonaws.com/'+fileName.name;
};

export default upload;