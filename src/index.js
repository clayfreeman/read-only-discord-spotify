(() => {
  document.getElementById('submit').addEventListener('click', (event) => {
    document.getElementById('message').innerHTML = ''
    let message = document.createElement('div')
    let url = undefined

    try {
      url = new URL(document.getElementById('url').value)
    }
    catch (e) {
    }

    if (url instanceof URL && url.host == "accounts.spotify.com" && url.searchParams.has('scope')) {
      let scope = url.searchParams.get('scope').split(' ')
      let index = scope.indexOf('user-modify-playback-state')

      if (index > -1) {
        scope.splice(index, 1)
        url.searchParams.set('scope', scope.join(' '))
      }

      message.className = 'alert alert-success'
      message.innerHTML = 'If the new authorization request did not open automatically, <a href="' + url.toString() + '">click here</a>. After approving the new authorization request, the read-only connection will be complete.'
      message.setAttribute('role', 'alert')

      try {
        window.open(url.toString())
      }
      catch (e) {
      }
    }
    else {
      message.className = 'alert alert-danger'
      message.innerHTML = 'An invalid URL was provided. The URL must be for <em>accounts.spotify.com</em> and contain a <code>scope</code> parameter.'
      message.setAttribute('role', 'alert')
    }

    document.getElementById('message').appendChild(message)
  })
})()
