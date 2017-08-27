(function(root) {
  readingList = root.readingList || {}
  readingList.app = {}
  const app = readingList.app
  app.elements = {}

  app.userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: readingList.config.UserPoolId,
    ClientId: readingList.config.ClientId
  })

  AWSCognito.config.region = readingList.config.region
  AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
    IdentityPoolId: readingList.config.IdentityPoolId
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    app.elements.header = document.querySelector('header')
    app.elements.main = document.querySelector('main')
    app.elements.footer = document.querySelector('footer')

    readingList.eventEmitter.on('logout', () => {
      readingList.util.clearPage()
      readingList.eventEmitter.emit('makeLogin')
    })

    readingList.eventEmitter.on('login', () => {
      readingList.util.clearPage()
      const logoutBtn = readingList.controller.buildLogout()
      readingList.listeners.logout(logoutBtn)
      readingList.app.elements.header.appendChild(logoutBtn)
      readingList.app.elements.main.innerHTML = readingList.controller.buildHomepage()
      const bookForm = readingList.controller.buildBookForm()
      readingList.listeners.submitBook(bookForm)
      readingList.app.elements.main.appendChild(bookForm)
    })

    readingList.eventEmitter.on('makeLogin', () => {
      readingList.util.clearPage()
      const header = readingList.controller.buildHeader('Sign Up')
      readingList.listeners.setHeader(header, 'makeSignUp')
      app.elements.header.appendChild(header)
      readingList.controller.setAuthForm('login')
    })
    
    readingList.eventEmitter.on('makeSignUp', () => {
      readingList.util.clearPage()
      const header = readingList.controller.buildHeader('Log In')
      readingList.listeners.setHeader(header, 'makeLogin')
      app.elements.header.appendChild(header)
      readingList.controller.setAuthForm('sign up')
    })

    readingList.eventEmitter.on('makeHomepage', () => {
      
    })
    
    const currentUser = app.userPool.getCurrentUser()

    if (currentUser === null) {
      readingList.eventEmitter.emit('makeLogin')
    } else {
      readingList.eventEmitter.emit('login')
      readingList.util.refresh(currentUser)
    }
  })
})(this)
