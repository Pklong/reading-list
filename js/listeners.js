(function(root) {
  readingList = root.readingList || {}
  readingList.listeners = {}
  const listeners = readingList.listeners
  
  listeners.addSubmitListener = function() {
    const form = document.querySelector('form')
    document.querySelector('button').addEventListener('click', (e) => {
      e.preventDefault()
      const titleInput = form.querySelector('#bookTitle')
      const readCheckbox = form.querySelector('#readBook')
      const data = {
	title: titleInput.value,
	read: readCheckbox.checked
      }
      readingList.api.createBook(data)
		 .then(() => {
		   titleInput.value = ''
		   readCheckbox.checked = false
      })
    })
  }

  listeners.addDeleteListener = function() {
    document.querySelector('ul.books').addEventListener("click", (e) => {
      if (e.target && e.target.matches('button')) {
	const bookId = e.target.parentNode.dataset.id
	readingList.api.deleteBook(bookId)
      }
    })
  }
})(this)
