import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

import {
  CognitoIdentityCredentials,
  config
} from 'aws-sdk/global'

import AppConfig from './config'

const util = {
  authenticate(loginObj, userPool, loginCB) {
    const authenticationDetails = new AuthenticationDetails(loginObj)
    const cognitoUser = new CognitoUser({
      Username: loginObj.Username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess (result) {
	config.credentials = new CognitoIdentityCredentials({
	  IdentityPoolId: AppConfig.IdentityPoolId,
	  Logins: {
	    [AppConfig.loginKey]: result.getAccessToken().getJwtToken()
	  }
	})
	loginCB(cognitoUser)
      },
      onFailure (error) {
	console.error(error)
      }
    })
  },
  
  signUp(signUpObj) {
    const attributeList = [
      new CognitoUserAttribute({
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
    
  },

  refresh(user) {
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

      config.credentials = new CognitoIdentityCredentials({
	IdentityPoolId: AppConfig.IdentityPoolId,
	Logins: {
	  [AppConfig.loginKey]: session.getIdToken().getJwtToken()
	}
      }, {
	region: AppConfig.region
      })
      config.credentials.refresh(err => {
	if (err) {
	  console.error(err)
	} else {
	  console.log('refreshed credentials')
	}
      })
    })
  },

  signOut() {
    const currentUser = readingList.app.userPool.getCurrentUser()
    currentUser && currentUser.signOut()
    AWSCognito.config.clear()
    readingList.eventEmitter.emit('logout')
  }
}

export default util
