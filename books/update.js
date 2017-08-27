'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()



module.exports.update = (event, context, callback) => {

  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  if (data.title && typeof data.title !== 'string' ||
      data.readStatus && typeof data.readStatus !== 'string'
      && !['will read', 'have read', 'reading'].includes(data.readStatus) {
    console.error('Validation Error')
    callback(new Error('could not update book'))
    return
  }
  
  const params = {
    TableName: 'Books',
    Key: {
      UserId: event.requestContext.identity.cognitoIdentityId,
      Id: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#read_book': 'ReadStatus'
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':read': data.readStatus,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET Title = :title, #read_book = :read, UpdatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }
  
  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('could not update book'))
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
