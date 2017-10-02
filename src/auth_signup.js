import { h, Component } from "preact"

export default class AuthSignup extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  }

  submitForm = e => {
    e.preventDefault()
    const { username, password, email } = this.state
    const { userpool, setCreds, signUp, setMsg } = this.props
    const signUpOpts = { Username: username, Password: password, Email: email }
    signUp(signUpOpts, userpool, setCreds, setMsg)
    this.setState({
      username: "",
      password: "",
      email: ""
    })
  }

  render({}, { username, password, email }) {
    return (
      <section>
        <form className="auth" onSubmit={this.submitForm}>
          <label for="login">Enter your username</label>
          <input
            type="text"
            id="login"
            onChange={e => this.setState({ username: e.target.value })}
            placeholder="Username"
            value={username}
          />
          <label for="login">Enter your email</label>
          <input
            type="text"
            id="login"
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email"
            value={email}
          />
          <label for="password">Enter your password</label>
          <input
            type="password"
            id="password"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
            value={password}
          />
          <button>Sign Up</button>
        </form>
      </section>
    )
  }
}
