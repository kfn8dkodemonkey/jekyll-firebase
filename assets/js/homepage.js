/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  if (document.title != 'Become a Member Agency'){
    if(document.title != 'Thank You'){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // set right side profile info
          if(document.title != "Homepage"){
            var photoURL = user.photoURL;
            var displayName = user.displayName;
            var email = user.email;
            //var emailVerified = user.emailVerified;

            // [START_EXCLUDE]
            // show logindin user infor
            document.getElementById('profilePhoto').src = photoURL;
            document.getElementById('emailAddress').href = "mailto:" + email;
            document.getElementById('displayName').textContent = displayName;
            document.getElementById('phoneNumber').innerHTML = phoneNumber;

            //document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]

            // show logout
            document.getElementById('logout').classList.remove('hide');
            // hide logindin
            //document.getElementById('login').classList.add('hide');
          }

          switch (document.title) {
            case 'Homepage':
              window.location ="/members-only/welcome.html";
              break;
            case 'Members Only':
              break;
            case 'Manage Profile':
              // User is signed in.
              //var photoURL = user.photoURL;
              //var displayName = user.displayName;
              //var email = user.email;

              // [START_EXCLUDE]
              // show logindin user infor
              //document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('photoURL').value = photoURL;
              document.getElementById('fullName').value = displayName;
              document.getElementById('email').value = email;

              // [END_EXCLUDE]
              break;
            case 'List Applications':
              // Listen to collection changes
              viewApplications();
              break;
            case 'View Application':
              const queryString = window.location.search;
              const urlParam = new URLSearchParams(queryString);

              const recordId = urlParam.get('id');

              viewRecord(recordId);
              //console.log(recordId);
              break;
            default:
          }
        } else {
          // User is signed out.
          if (document.title != "Homepage"){
            window.location.replace('/index.html');
          }
        }
      });
    }
  }

  // [END authstatelistener]
  switch (document.title) {
    case 'Homepage':
      document.getElementById('sign-in').addEventListener('click', handleSignIn, false);
      break;
    case 'Manage Profile':
      document.getElementById('updateAccount').addEventListener('click', updateAccount, false);
      break;
    case 'Become a Member Agency':
      document.getElementById('BMA').addEventListener('submit', memeberAgencyRequest);
      break;
    case 'View Application':
      document.getElementById('approve').addEventListener('click', updateStatus.bind(this,'approved'), false);
      document.getElementById('decline').addEventListener('click', updateStatus.bind(this,'declined'), false);
      document.getElementById('delete').addEventListener('click', deleteApplication, false);
      break;
    default:
  }

  if(document.title != 'Homepage'){
    document.getElementById('logout').addEventListener('click', handleSignOut, false);
  }
}

window.onload = function() {
  initApp();
};
