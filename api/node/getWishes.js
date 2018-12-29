const env = require('dotenv').config({ path: '../../.env' });
console.log(env);
const config = require('../config');
const AWS = require('aws-sdk');
const { json, send } = require('micro');

AWS.config.update({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_DDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DDB_SECRET_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: config.TABLE_NAME
};

module.exports = (req, res) => {
  //  ddb scans and returns all items
  ddb.scan(params, function(err, data) {
    if (err) {
      console.log('Error', err);
      send(res, 500, err);
    } else {
      console.log('Success', data);
      send(res, 200, data);
    }
  });
};
