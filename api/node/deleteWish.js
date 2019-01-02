require('dotenv').config();
const config = require('../config');
const AWS = require('aws-sdk');
const { json, send } = require('micro');

AWS.config.update({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_DDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DDB_SECRET_KEY
  }
});

const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

module.exports = async (req, res) => {
  console.log('DELETE WISH');
  try {
    const data = await json(req);
    if (!data.user_id) {
      send(res, 500, { message: 'No user id' });
    }
    console.log('data', data)

    let params = {
      TableName: config.TABLE_NAME,
      Key: {
        user_id: { S: data.user_id && String(data.user_id) }
      }
    };

    ddb.deleteItem(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
        send(res, 200, data);
      }
    });
  } catch (e) {
    console.log(e);
    const error = { error: e };
    send(res, 500, error);
  }
};
