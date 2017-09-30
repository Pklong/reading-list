import { h, Component } from "preact"
import Api from "./api"

export default class BookIndex extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    /* this.apiClient = Api.buildClient(this.props.creds)
     * this.apiClient.invokeApi({}, '/books', 'GET', {}, {})
     * .then(books => this.setState({books: books.data}))*/
    this.setState({
      books: [
        {
          Id: "59c7f2e4bdf64a8daa60465e",
          UserId: "59c7f2e4d8808d6e5ff9b0e2",
          ReadStatus: "will read",
          Title: "est duis culpa dolor",
          CreatedAt: "2017-05-04T08:36:57 +04:00",
          UpdatedAt: "2017-05-15T10:55:40 +04:00"
        },
        {
          Id: "59c7f2e41a0a3b0caa3b69fc",
          UserId: "59c7f2e4539d78c6717988a9",
          ReadStatus: "reading",
          Title: "nisi quis pariatur enim",
          CreatedAt: "2017-07-14T09:04:48 +04:00",
          UpdatedAt: "2017-07-19T06:12:03 +04:00"
        },
        {
          Id: "59c7f2e463a6df5bcd65f7e8",
          UserId: "59c7f2e4ffe3f7c1f7252c33",
          ReadStatus: "will read",
          Title: "proident incididunt consequat adipisicing",
          CreatedAt: "2017-04-06T08:58:50 +04:00",
          UpdatedAt: "2017-03-03T11:50:52 +05:00"
        },
        {
          Id: "59c7f2e4608a4b4f99b65c66",
          UserId: "59c7f2e44444074ef1ef68be",
          ReadStatus: "reading",
          Title: "ipsum et deserunt aute",
          CreatedAt: "2017-04-29T02:34:55 +04:00",
          UpdatedAt: "2017-02-04T03:08:31 +05:00"
        },
        {
          Id: "59c7f2e4f9c98106345cd209",
          UserId: "59c7f2e47f4bfb7d7b9b3c84",
          ReadStatus: "will read",
          Title: "cupidatat irure anim voluptate",
          CreatedAt: "2017-09-01T09:47:07 +04:00",
          UpdatedAt: "2017-08-12T09:12:35 +04:00"
        }
      ]
    })
  }

  render({}, { books }) {
    const bookList = books.map(b => {
      return (
        <li>
          <h3>{b.Title}</h3>
          <p>{b.ReadStatus}</p>
        </li>
      )
    })
    return <article>{bookList}</article>
  }
}
