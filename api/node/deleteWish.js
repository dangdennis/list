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
    UserId: { S: 'Dennis Dang' },
    ItemId: { S: '001' }
  }
  // ProjectionExpression: 'UserId'
};

module.exports = (req, res) => {
  // Call DynamoDB to read the item from the table
  // ddb.deleteItem(params, function(err, data) {
  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   if (err) {
  //     console.log('Error', err);
  //     res.write(err.toString());
  //     res.end();
  //   } else {
  //     console.log('Success', data);
  //     res.write(data.toString());
  //     res.end();
  //   }
  // });
};
