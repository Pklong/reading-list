import { h, Component } from "preact"
const bookStatuses = ["will read", "reading", "have read"]
class BookIndexItem extends Component {
  state = {
    value: this.props.book.ReadStatus
  }

  handleChange = e => {
    const readStatus = e.target.value
    const { api, book, setMsg } = this.props
    api
      .invokeApi({ id: book.Id }, `/books/{id}`, "PUT", {}, { readStatus })
      .then(() => {
        this.setState({ value: e.target.value })
      })
      .catch(e => {
        setMsg(e.message)
      })
  }

  render({ book }, {}) {
    const options = bookStatuses.map(status => {
      return <option value={status}>{status}</option>
    })
    return (
      <li>
        <h3>{book.Title}</h3>
        <select value={this.state.value} onChange={this.handleChange}>
          {options}
        </select>
      </li>
    )
  }
}

export default BookIndexItem
