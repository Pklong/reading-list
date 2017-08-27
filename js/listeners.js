(function(root) {
  readingList = root.readingList || {}
  readingList.listeners = {}
  const listeners = readingList.listeners
  
  listeners.signUp = function (formEl) {
    formEl.addEventListener('submit', e => {
      e.preventDefault()
      const Username = formEl.querySelector('#username').value
      const Email = formEl.querySelector('#email').value      
      const Password = formEl.querySelector('#password').value
      readingList.util.signUp({
	Username,
	Email,
	Password
      })
    })
  }
  
  listeners.login = function (formEl) {
    formEl.addEventListener('submit', e => {
      e.preventDefault()
      const Username = formEl.querySelector('input[type=text]').value
      const Password = formEl.querySelector('input[type=password]').value
      readingList.util.authenticate({
	Username,
	Password
      })
    })
  }

  listeners.setHeader = function(anchorTag, action) {
    anchorTag.addEventListener('click', e => {
      e.preventDefault()
      readingList.eventEmitter.emit(action)
    })
    
  }
  
  listeners.logout = function (buttonEl) {
    buttonEl.addEventListener('click', e => {
      e.preventDefault()
      readingList.util.signOut()
    })
  }

  listeners.submitBook = function (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault()
      const title = formEl.querySelector('#bookTitle')
      const readStatus = formEl.querySelector('#readStatus')
      readingList.api.createBook({title: title.value, readStatus: readStatus.value})
			       .then(() => {
				 title.value = ''
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
