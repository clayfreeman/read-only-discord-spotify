"use strict";

(function () {
  document.getElementById('submit').addEventListener('click', function (event) {
    document.getElementById('message').innerHTML = '';
    var message = document.createElement('div');
    var url = undefined;

    try {
      url = new URL(document.getElementById('url').value);
    } catch (e) {}

    if (url instanceof URL && url.host == "accounts.spotify.com" && url.searchParams.has('scope')) {
      var scope = url.searchParams.get('scope').split(' ');
      var index = scope.indexOf('user-modify-playback-state');

      if (index > -1) {
        scope.splice(index, 1);
        url.searchParams.set('scope', scope.join(' '));
      }

      message.className = 'alert alert-success';
      message.innerHTML = 'Success! Approve the new authorization request that was just opened. If the new authorization request did not open automatically, <a href="' + url.toString() + '">click here</a>.';
      message.setAttribute('role', 'alert');

      try {
        window.open(url.toString());
      } catch (e) {}
    } else {
      message.className = 'alert alert-danger';
      message.innerHTML = 'An invalid URL was provided. The URL must be for <em>accounts.spotify.com</em> and contain a <code>scope</code> parameter.';
      message.setAttribute('role', 'alert');
    }

    document.getElementById('message').appendChild(message);
  });
})();