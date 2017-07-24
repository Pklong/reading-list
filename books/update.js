'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()



module.exports.update = (event, context, callback) => {

  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  if (data.title && typeof data.title !== 'string' ||
      data.read && typeof data.read !== 'boolean') {
    console.error('Validation Error')
    callback(new Error('could not update book'))
    return
  }
  
  const params = {
    TableName: 'booksTable',
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#read_book': 'read'
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':read': data.read,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET title = :title, #read_book = :read, updatedAt = :updatedAt',
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
