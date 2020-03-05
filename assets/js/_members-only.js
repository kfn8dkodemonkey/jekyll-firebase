
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
        //var emailAddress = user.email;


        //var emailVerified = user.emailVerified;

        //var isAnonymous = user.isAnonymous;
        //var uid = user.uid;
        //var providerData = user.providerData;

        // [START_EXCLUDE]
        // show logindin user infor
        //document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('profilePhoto').src = photoURL;
        document.getElementById('emailAddress').href = "mailto:" + email;
        document.getElementById('displayName').textContent = displayName;
        document.getElementById('phoneNumber').innerHTML = phoneNumber;

        //document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');

        // [END_EXCLUDE]
      } else {
        // User is signed out.
        window.location = '/index.html';
        // [END_EXCLUDE]
      }
    });
    // [END authstatelistener]
    document.getElementById('logout').addEventListener('click', handleSignOut, false);
    //document.getElementById('updateAccount').addEventListener('click', updateAccount, false);
  }

  window.onload = function() {
    initApp();
  };
