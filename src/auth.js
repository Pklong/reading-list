import { h, Component } from "preact"

import AuthLogin from "./auth_login"
import AuthSignup from "./auth_signup"
import Util from "./util"

export default class Auth extends Component {
  render({ userpool, setCreds, setMsg, formType }) {
    return (
      <section>
        {formType === "login" ? (
          <AuthLogin
            login={Util.authenticate}
            userpool={userpool}
            setMsg={setMsg}
            setCreds={setCreds}
          />
        ) : (
          <AuthSignup
            signUp={Util.signUp}
            userpool={userpool}
            setMsg={setMsg}
            setCreds={setCreds}
          />
        )}
      </section>
    )
  }
}
