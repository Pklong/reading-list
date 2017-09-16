import { h, Component } from 'preact';

import AppConfig from './config'

import { CognitoUserPool } from 'amazon-cognito-identity-js';

import Util from './util'

import Auth from './auth';

export default class App extends Component {
  
  userPool = new CognitoUserPool({
    UserPoolId: AppConfig.UserPoolId,
    ClientId: AppConfig.ClientId
  })

  state = {
    currentUser: this.userPool.getCurrentUser()
  }

  componentDidMount() {
    const currentUser = this.userPool.getCurrentUser()
    if (currentUser !== null) {
      Util.refresh(currentUser)
    }
  }

  render(_, { currentUser }) {
    return (
      <div id="app">
	  {
	    currentUser ?
	    <div>{currentUser.username}</div> :
	    <Auth userPool={this.userPool}
		  login={currentUser => this.setState({currentUser})}
	    />
	  }
	  
      </div>
    );
  }
}
