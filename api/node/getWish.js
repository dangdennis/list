require('dotenv').config({ path: '../../.env' });
const config = require('../config');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_DDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DDB_SECRET_KEY
  }
});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: config.TABLE_NAME,
  Key: {
    UserId: { S: '1' }
    // time_stamp: { S: "1544932095618" }
  }
  // ProjectionExpression: 'UserId'
};

module.exports = (req, res) => {
  // Call DynamoDB to read the item from the table
  // ddb.getItem(params, function(err, data) {
  //   if (err) {
  //     console.log('Error', err);
  //     // res.write(err.toString());
  //     // res.end();
  //   } else {
  //     console.log('Success', JSON.stringify(data));
  //     // res.write(data.toString());
  //     // res.end();
  //   }
  // });
};
