import { h } from "preact"

const Notification = ({ msg }) =>
  msg ? <div className="notification">{msg}</div> : null

export default Notification
