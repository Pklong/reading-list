(function(root) {
  readingList = root.readingList || {}
  readingList.api = {}
  const api = readingList.api
  
  const API_URL = 'https://w6i9b7bsnc.execute-api.us-east-1.amazonaws.com/dev/books'

  api.fetchAllBooks = function() {
    const header = new Headers()
    const opts = {
      header,
      method: 'GET',
      mode: 'cors'
    }

    fetch(API_URL, opts)
      .then(d => d.json())
      .then(books => readingList.util.buildBookList(books))
      .catch(errors => readingList.util.buildErrors(errors))
  }

  api.createBook = function(book) {
    const header = new Headers()
    const opts = {
      header,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(book)
    }

    return fetch(API_URL, opts)
      .then(() => fetch(API_URL)
	.then(d => d.json())
	.then(books => readingList.util.buildBookList(books)))
      .catch(errors => {
	console.error(errors)
      })
  }

  api.deleteBook = function(bookId) {
    const header = new Headers()
    const opts = {
      header,
      method: 'DELETE',
      mode: 'cors'
    }

      fetch(`${API_URL}/${bookId}`, opts)
      .then(() => fetch(API_URL)
	.then(d => d.json())
	.then(books => readingList.util.buildBookList(books)))
      .catch(errors => {
	console.error(errors)
    })
  }


  
})(this)
