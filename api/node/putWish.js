const env = require('dotenv').config();
console.log(env);
const config = require('../config');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const { json, send } = require('micro');

AWS.config.update({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_DDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DDB_SECRET_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
});

const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

let mockParams = {
  TableName: config.TABLE_NAME,
  Item: {
    user_id: { S: uuid() },
    time_stamp: { N: String(Date.now()) },
    wishlist: { L: new Array(3).fill(null).map(item => ({ S: 'asdfasf' })) },
    name: {
      S: 'Mock user' + uuid()
    }
  }
};

module.exports = async (req, res) => {
  try {
    const data = await json(req);
    console.log('json data: ', data);

    let wishes = [];
    if (data.wishes && data.wishes.length) {
      wishes = data.wishes.map(wish => {
        return {
          S: wish
        };
      });
    }

    let params = {
      TableName: config.TABLE_NAME,
      Item: {
        user_id: { S: data.user_id ? String(data.user_id) : String(uuid()) },
        time_stamp: { N: String(Date.now()) },
        wishlist: { L: wishes },
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
        send(res, 200, data);
      }
    });
  } catch (e) {
    console.log(e);
    const error = { error: e };
    send(res, 500, error);
  }
};
