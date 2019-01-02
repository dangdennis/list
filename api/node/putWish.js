require('dotenv').config();
const config = require('../config');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
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
  console.log('PUT WISH');
  try {
    const data = await json(req);

    let wishlist = [];
    if (data.wishlist && data.wishlist.length) {
      wishlist = data.wishlist.map(wish => {
        return {
          S: wish
        };
      });
    }

    let uniqueId = String(uuid());

    let params = {
      TableName: config.TABLE_NAME,
      Item: {
        user_id: { S: data.user_id ? String(data.user_id) : uniqueId },
        time_stamp: { N: String(Date.now()) },
        wishlist: { L: wishlist },
        name: {
          S: data.name
        }
      }
    };

    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        send(res, 500, err);
      } else {
        console.log('Success', data);
        send(res, 200, { ...data, user_id: uniqueId, name: data.name });
      }
    });
  } catch (e) {
    console.log(e);
    const error = { error: e };
    send(res, 500, error);
  }
};
