import { h, Component } from 'preact';
import { route } from 'preact-router'

import Util from './util'



export default class Auth extends Component {
  state = {
    username: '',
    password: ''
  }
  submitForm = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { userPool, login } = this.props
    Util.authenticate({Username: username, Password: password}, userPool, login)    
  }
  render({currentUser}, {username, password}) {
    return (
      <form onSubmit={this.submitForm}>
	<label for="login">Enter your username or email</label>
	<input type="text"
	       id="login"
	       onChange={e => this.setState({username: e.target.value})}
	       placeholder="Username | Email"
	       value={username}
	/>
	
	<label for="password">Enter your password</label>
	<input type="password"
	       id="password"
	       onChange={e => this.setState({password: e.target.value})}
	       placeholder="Password"
	       value={password}
	/>
	<input type="submit"/>	
      </form>
    );
  }
}
