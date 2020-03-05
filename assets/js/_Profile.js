  /**
  * initApp handles setting up UI event listeners and registering Firebase auth listeners:
  *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
  *    out, and that is where we update the UI.
  */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var photoURL = user.photoURL;
        var displayName = user.displayName;
        var email = user.email;

        // [START_EXCLUDE]
        // show logindin user infor
        //document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('profilePhoto').value = photoURL;
        document.getElementById('fullName').value = displayName;
        document.getElementById('emailAddress').value = email;

        //document.getElementById('phoneNumber').value = phoneNumber;

        //document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
        document.getElementById('updated').classList.remove('hide');
        // [END_EXCLUDE]
      } else {
          // User is signed out.
          if(window.location != './members-only/BecomeMemberAgency.html'){
            window.location = '/index.html';
          }
        }
        // [END_EXCLUDE]
      });
    // [END authstatelistener]
    document.getElementById('logout').addEventListener('click', handleSignOut, false);
    
  }

  window.onload = function() {
    initApp();
  };
