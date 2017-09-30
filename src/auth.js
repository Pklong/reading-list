import { h, Component } from "preact"

import AuthLogin from "./auth_login"
import AuthSignup from "./auth_signup"
import Util from "./util"

export default class Auth extends Component {
  render({ userpool, setCreds, setMsg }, {}) {
    return (
      <section>
        <AuthLogin
          login={Util.authenticate}
          userpool={userpool}
          setMsg={setMsg}
          setCreds={setCreds}
        />
        <h2>OR</h2>
        <AuthSignup
          signUp={Util.signUp}
          userpool={userpool}
          setCreds={setCreds}
        />
      </section>
    )
  }
}
