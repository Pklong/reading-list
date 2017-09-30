import { h, Component } from "preact"

export default class Header extends Component {
  clickCB = e => {
    e.preventDefault()
    const { currentUser, signOut } = this.props
    currentUser.signOut()
    // clear currentUser and credentials
    signOut(null, null)
  }

  render({ currentUser }, {}) {
    let btn = currentUser ? (
      <button onClick={this.clickCB}>Sign Out</button>
    ) : null
    return (
      <header>
        <h1>READING LIST</h1>
        {btn}
      </header>
    )
  }
}
