const apigClientFactory = require('aws-api-gateway-client').default
import AppConfig from './config'
const api = {}

api.buildClient = function (credentials) {
  return apigClientFactory.newClient({
    invokeUrl: AppConfig.invokeUrl,
    accessKey: credentials.accessKeyId,
    secretKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken  
  })
}

api.fetchAllBooks = function() {
  if (api.client === undefined) {
    api.buildapigClient()
  }
  return api.client.booksGet()
	    .then(books => readingList.controller.buildBookList(books.data))
	    .catch(e => console.error(e))
}

api.createBook = function(book) {
  if (api.client === undefined) {
    api.buildapigClient()
  }
  return api.client.booksPost({}, book)
	    .then(d => console.log(d)).catch(e => console.error(e))
}

api.deleteBook = function(bookId) {
  if (api.client === undefined) {
    api.buildapigClient()
  }
  api.client.booksIdDelete({id: bookId})
     .then(d => console.log(d)).catch(e => console.error(e))    
}

api.updateBook = function(book) {
  if (api.client === undefined) {
    api.buildapigClient()
  }
  api.client.booksIdPut(
    {id: book.id}, {title: book.title, readStatus: book.ReadStatus}
  ).then(d => console.log(d)).catch(e => console.error(e))    
}

api.fetchSingleBook = function(bookId) {
  if (api.client === undefined) {
    api.buildapigClient()
  }
  api.client.booksIdGet({id: bookId})
     .then(d => console.log(d)).catch(e => console.error(e))    
}

export default api
