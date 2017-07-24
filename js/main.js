(function(root) {
  document.addEventListener("DOMContentLoaded", () => {
    readingList.listeners.addSubmitListener()
    readingList.listeners.addDeleteListener()

    readingList.api.fetchAllBooks()
  })
})(this)
