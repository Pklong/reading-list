(function(root) {
  readingList = root.readingList || {}
  readingList.controller = {}
  const controller = readingList.controller

  controller.buildHomepage = function() {
    return `
      <h1>Reading List</h1>
      <ul class="errors"></ul>
      <article>
	<ul class="books">
	</ul>
      </article>
    `
  }

  controller.buildBookList = function(books) {
    const frag = new DocumentFragment()
    books.forEach(book => {
      const li = document.createElement('li')
      li.textContent = `Title: ${book.Title}. Status: ${book.ReadStatus}`
      frag.appendChild(li)
    })
    document.querySelector('.books').appendChild(frag)
  }

  controller.buildBookForm = function() {
    const form = document.createElement('form')
    form.innerHTML = `
      <form>
	<label for="bookTitle">What is the book's title?</label>
	  <input id="bookTitle" type="text" placeholder="title" />
	    <label for="readStatus">Have you read this book?</label>
	      <select id="readStatus">
		<option value="will read">Will Read</option> 
		  <option value="reading">Reading Now</option>
		    <option value="have read">Have Read</option>
	      </select>
		      <button type="submit">Add a new book</button>
      </form>
    `
    return form
  }

  controller.buildLogin = function() {
    const form = document.createElement('form')
    form.innerHTML = `
      <label for="login">Enter your username or email</label>
	<input type="text"
	       id="login"
               placeholder="Username | Email"/>
	  
	  <label for="password">Enter your password</label>
	    <input type="password"
	           id="password"
		   placeholder="Password"/>
	      <input type="submit"/>	

    `
    return form
  }

  controller.buildSignUp = function() {
    const form = document.createElement('form')
    form.innerHTML = `
      <label for="email">Enter your email</label>
	<input type="text"
	  id="email"
               placeholder="Email"/>
	  
	  <label for="username">Enter your username</label>
	    <input type="text"
	      id="username"
		   placeholder="Username"/>
	      
	      <label for="password">Enter your password</label>
		<input type="password"
		  id="password"
		       placeholder="Password"/>
		  <input type="submit"/>	
    `
    return form
  }

  controller.buildLogout = function() {
    const btn = document.createElement('button')
    btn.textContent = 'Sign Out'
    return btn
  }

  controller.setAuthForm = function(authAction) {
    if (authAction === 'login') {
      const loginForm = controller.buildLogin()
      readingList.listeners.login(loginForm)
      readingList.app.elements.main.appendChild(loginForm)
    } else {
      const signUpForm = controller.buildSignUp()
      readingList.listeners.signUp(signUpForm)
      readingList.app.elements.main.appendChild(signUpForm)
    }
  }
  controller.buildHeader = function(action) {
    const anchorTag = document.createElement('a')
    anchorTag.textContent = action
    return anchorTag
  }

})(this)
