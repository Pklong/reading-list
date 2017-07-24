'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')

module.exports.create = (event, context, callback) => {

  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)
  
  if (typeof data.title !== 'string') {
    console.error('Validation Failed')
    callback(new Error('Could not create book'))
    return
  }
  
  const params = {
    TableName: 'booksTable',
    Item: {
      id: uuid.v1(),
      title: data.title,
      read: data.read,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }
  
  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('Could not create book'))
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
