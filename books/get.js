'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()



module.exports.get = (event, context, callback) => {

  const params = {
    TableName: 'Books',
    Key: {
      UserId: event.requestContext.identity.cognitoIdentityId,
      Id: event.pathParameters.id
    }
  }
  
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('could not fetch book'))
      return
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Item)
    }

    callback(null, response)
  })
}
