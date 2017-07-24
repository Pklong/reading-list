(function(root) {
  readingList = root.readingList || {}
  readingList.util = {}
  const util = readingList.util
  
  util.buildBookList = function(books) {
    const list = document.querySelector('ul.books')
    util.empty(list)
    const frag = document.createDocumentFragment()
    books.forEach(book => {
      const li = document.createElement('li')
      const button = document.createElement('button')
      button.textContent = "delete"
      li.textContent = book.title
      li.dataset.id = book.id
      if (book.read) li.style.textDecoration = 'line-through'
      li.appendChild(button)
      frag.appendChild(li)
    })
    list.appendChild(frag)
  }

  util.buildErrors = function(errors) {
    const list = document.querySelector('ul.errors')
    errors.forEach(error => {
      const li = document.createElement('li')
      li.textContent = error.message
      frag.appendChild(li)
    })
    list.appendChild(frag)
  }

 util.empty = function(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }

})(this)
