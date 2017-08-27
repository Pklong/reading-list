'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = (event, context, callback) => {
  const currentUser = event.requestContext.identity.cognitoIdentityId

  const params = {
    TableName: 'Books',
    KeyConditionExpression: 'UserId = :UserId',
    ExpressionAttributeValues: {
      ":UserId": currentUser
    }
  }
  
  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('could not fetch books'))
      return
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Items)
    }

    callback(null, response)
  })
}
