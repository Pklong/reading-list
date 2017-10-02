import { h, Component } from "preact"

import AppConfig from "./config"

import { CognitoUserPool } from "amazon-cognito-identity-js"

import Util from "./util"
import BookIndex from "./book_index"
import Notification from "./notification"
import Auth from "./auth"
import Header from "./header"
import Footer from "./footer"

import "style"

export default class App extends Component {
  userPool = new CognitoUserPool({
    UserPoolId: AppConfig.UserPoolId,
    ClientId: AppConfig.ClientId
  })

  state = {
    currentUser: this.userPool.getCurrentUser(),
    creds: null,
    msg: "",
    auth: "login"
  }

  refresh = (currentUser, creds) => this.setState({ currentUser, creds })

  setMsg = msg =>
    this.setState({ msg }, () => {
      setTimeout(() => this.setState({ msg: "" }), 3000)
    })

  setAuth = authState => () => this.setState({ auth: authState })

  componentDidMount() {
    const currentUser = this.userPool.getCurrentUser()
    if (currentUser !== null) {
      Util.refresh(currentUser, this.refresh)
    }
  }

  render(_, { currentUser, creds, msg, auth }) {
    return (
      <main id="app">
        <Notification msg={msg} />
        <Header
          authForm={auth}
          currentUser={currentUser}
          setAuth={this.setAuth}
          signOut={this.refresh}
        />
        {currentUser && creds ? (
          <BookIndex
            currentUser={currentUser}
            setMsg={this.setMsg}
            creds={creds}
          />
        ) : currentUser && !creds ? (
          <div className="loader" />
        ) : (
          <Auth
            userpool={this.userPool}
            setCreds={this.refresh}
            setMsg={this.setMsg}
            formType={auth}
          />
        )}
        <Footer />
      </main>
    )
  }
}
