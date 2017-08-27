(function(root) {
  readingList = root.readingList || {}
  
  let currentUser = readingList.app.userPool.getCurrentUser()
  
  const signOutCB = () => {
      currentUser ? currentUser.signOut() : console.error("No current user")
  }
  
  function AuthButton() {
    const signOut = document.createElement('button')
    signOut.textContent = "Sign Out"
    signOut.addEventListener('click', e => {
      e.preventDefault
      signOutCB()
    })
    return signOut
    }
  }

  readingList.AuthButton = AuthButton
  }(this))
