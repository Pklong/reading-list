'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')

module.exports.create = (event, context, callback) => {

  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)
  
  if (typeof data.title !== 'string' ||
      !['will read', 'have read', 'reading'].includes(data.readStatus)) {
    console.error('Validation Failed')
    callback(new Error('Could not create book'))
    return
  }
  
  const params = {
    TableName: 'Books',
    Item: {
      Id: uuid.v1(),
      UserId: event.requestContext.identity.cognitoIdentityId,
      Title: data.title,
      ReadStatus: data.readStatus,
      CreatedAt: timestamp,
      UpdatedAt: timestamp
    }
  }
  
  dynamoDb.put(params, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: ''
    }
    if (error) {
      response.statusCode = 422
      response.body = JSON.stringify(new Error('Could not create book'))
      callback(null, response)
      return
    }
    // put does not support returning the created item...
    response.body = JSON.stringify({id: params.Item.Id, title: params.Item.Title})
    callback(null, response)
  })
}
