(function(root) {
  readingList = root.readingList || {}
  readingList.util = {}
  const util = readingList.util

  util.authenticate = function(loginObj) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginObj)
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: loginObj.Username,
      Pool: readingList.app.userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
	AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
	  IdentityPoolId: readingList.config.IdentityPoolId,
	  Logins: {
	    [readingList.config.loginKey]: result.getAccessToken().getJwtToken()
	  }
	})
	readingList.eventEmitter.emit('login')
      },
      onFailure: function (error) {
	console.error(error)
      }
    })
  }
  
  util.signUp = function(signUpObj) {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
	Name: 'email',
	Value: signUpObj.Email	
      })
    ]
    const { Username, Password } = signUpObj
    readingList.app.userPool.signUp(
      Username,
      Password,
      attributeList,
      null,
      function (err, result) {
	if (err) {
	  console.error(err)
	  return
	}
	readingList.eventEmitter.emit('login')
    })
    
  }

  util.refresh = function(user) {
    user.getSession((err, session) => {
      if (err) {
	console.error(err)
	return
      }

      user.getUserAttributes((err, attributes) => {
	if (err) {
	  console.error(err)
	}
      })

      AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
	IdentityPoolId: readingList.config.IdentityPoolId,
	Logins: {
	  [readingList.config.loginKey]: session.getIdToken().getJwtToken()
	}
      }, {
	region: readingList.config.region
      })
      AWSCognito.config.credentials.refresh(err => {
	if (err) {
	  console.error(err)
	} else {
	  readingList.api.fetchAllBooks()
	}
      })
    })
  }

  util.signOut = function() {
    const currentUser = readingList.app.userPool.getCurrentUser()
    currentUser && currentUser.signOut()
    AWSCognito.config.clear()
    readingList.eventEmitter.emit('logout')
  }

  util.empty = function(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }

  util.clearPage = function() {
    util.empty(readingList.app.elements.header)
    util.empty(readingList.app.elements.main)
  }
})(this)
