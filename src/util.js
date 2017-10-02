import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js"

import { CognitoIdentityCredentials, config } from "aws-sdk/global"

import AppConfig from "./config"

const util = {
  authenticate(loginObj, userPool, loginCB, errCB) {
    const authenticationDetails = new AuthenticationDetails(loginObj)
    const cognitoUser = new CognitoUser({
      Username: loginObj.Username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        config.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: AppConfig.IdentityPoolId,
          Logins: {
            [AppConfig.loginKey]: result.getAccessToken().getJwtToken()
          }
        })
        loginCB(cognitoUser, config.credentials)
      },
      onFailure(error) {
        errCB(error.message)
      }
    })
  },

  signUp(signUpObj, userpool, refreshCB, setMsg) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: signUpObj.Email
      })
    ]
    const { Username, Password } = signUpObj
    userpool.signUp(Username, Password, attributeList, null, function(
      err,
      result
    ) {
      if (err) {
        setMsg(err.message)
      } else {
        setMsg(`${result.user.username} created. Please confirm email.`)
      }
    })
  },

  refresh(user, refreshCB) {
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

      config.credentials = new CognitoIdentityCredentials(
        {
          IdentityPoolId: AppConfig.IdentityPoolId,
          Logins: {
            [AppConfig.loginKey]: session.getIdToken().getJwtToken()
          }
        },
        {
          region: AppConfig.region
        }
      )
      config.credentials.refresh(err => {
        if (err) {
          console.error(err)
        } else {
          refreshCB(user, config.credentials)
        }
      })
    })
  },
  signOut() {
    const currentUser = readingList.app.userPool.getCurrentUser()
    currentUser && currentUser.signOut()
    AWSCognito.config.clear()
  }
}

export default util
