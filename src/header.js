import { h, Component } from "preact"

export default class Header extends Component {
  clickCB = e => {
    e.preventDefault()
    const { currentUser, signOut } = this.props
    currentUser.signOut()
    // clear currentUser and credentials
    signOut(null, null)
  }

  render({ currentUser, setAuth, authForm }, {}) {
    const authBtn =
      authForm === "login" ? (
        <button onClick={setAuth("signup")}>Sign Up</button>
      ) : (
        <button onClick={setAuth("login")}>Login</button>
      )
    const signOutBtn = currentUser ? (
      <button onClick={this.clickCB}>Sign Out</button>
    ) : null
    return (
      <header>
        <h1>READING LIST</h1>
        {authBtn}
        {signOutBtn}
      </header>
    )
  }
}
