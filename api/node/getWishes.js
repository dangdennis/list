require('dotenv').config();
const config = require('../config');
const AWS = require('aws-sdk');
const { send } = require('micro');

AWS.config.update({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_DDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DDB_SECRET_KEY
  }
});

ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: config.TABLE_NAME
};

module.exports = (req, res) => {
  // Queries for all the wishes in DynamoDB
  ddb.scan(params, function(err, data) {
    if (err) {
      send(res, 500, err);
    } else {
      // res.Items is returned as an array
      if (data.Items && data.Items.length) {
        // Unmarshall, aka reformat, the results to regular JSON format
        let unmarshalled = data.Items.map(item =>
          AWS.DynamoDB.Converter.unmarshall(item)
        );
        data.Items = unmarshalled; // We want to keep the other data points from DynamoDB
      }
      send(res, 200, data);
    }
  });
};
