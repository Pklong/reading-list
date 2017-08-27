'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()



module.exports.delete = (event, context, callback) => {

  const params = {
    TableName: 'Books',
    Key: {
      UserId: event.requestContext.identity.cognitoIdentityId,
      Id: event.pathParameters.id
    }
  }
  
  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('could not delete book'))
      return
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({})
    }

    callback(null, response)
  })
}
