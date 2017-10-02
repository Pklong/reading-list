import { h, Component } from "preact"

export default class AuthLogin extends Component {
  state = {
    username: "",
    password: ""
  }

  submitForm = e => {
    e.preventDefault()
    const { username, password } = this.state
    const { userpool, login, setCreds, setMsg } = this.props
    login(
      { Username: username, Password: password },
      userpool,
      setCreds,
      setMsg
    )
    this.setState({
      username: "",
      password: ""
    })
  }

  render({ currentUser }, { username, password }) {
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

          <label for="password">Enter your password</label>
          <input
            type="password"
            id="password"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
            value={password}
          />
          <button>Login</button>
        </form>
      </section>
    )
  }
}
