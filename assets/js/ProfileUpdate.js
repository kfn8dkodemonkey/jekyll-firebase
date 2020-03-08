// add Become Member Agency Data
function memeberAgencyRequest(){
  // Agency Person In Charge
  var agency = document.getElementById('agency').value;
  // Radio selection
  var membership = document.getElementsByName('membership');
  var add1 = document.getElementById('address-1').value;
  var add2 = document.getElementById('address-2').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zip').value;
  var firstName = document.getElementById('APIC-First-Name').value;
  var mi = document.getElementById('APIC-MI').value;
  var lastName = document.getElementById('APIC-Last-Name').value;
  var apicRank = document.getElementById('APIC-Rank').value;

  // Pregerred Contact
  var pcFN = document.getElementById('PC-First-Name').value;
  var pcLN = document.getElementById('PC-Last-Name').value;
  var pcRank = document.getElementById('PC-Rank').value;
  var pcBPhoneArea = document.getElementById('PC-Business-Phone-area').value;
  var pcBPhoneDetail1 = document.getElementById('PC-Business-Phone-detail1').value;
  var pcBPhoneDetail2 = document.getElementById('PC-Business-Phone-detail2').value;
  var pcCPhoneArea = document.getElementById('PC-Cell-Phone-area').value;
  var pcCPhoneDetail1 = document.getElementById('PC-Cell-Phone-detail1').value;
  var pcCPhoneDetail2 = document.getElementById('PC-Cell-Phone-detail2').value;
  var pcEmail = document.getElementById('PC-Email').value;
  // Data Sources:
  var rmsProvider = document.getElementById('RMS').value;
  var cadProvider = document.getElementById('CAD').value;
  var lprProvider = document.getElementById('LPR').value;
  var jmsProvider = document.getElementById('JMS').value;
  var otherDSP = document.getElementById('OTHERDSP').value;
  // Checkbox & Data Amount for RMS
  var rms = document.getElementById('group[6927]-6927-0').value;
  var rmsData = document.getElementById('RMSDATA').value;
  // Checkbox & Data Amount for CAD
  var cad = document.getElementById('group[6927]-6927-1').value;
  var cadData = document.getElementById('CADDATA').value;
  // Checkbox & Data Amount for LPR
  var lpr = document.getElementById('group[6927]-6927-2').value;
  var lprData = document.getElementById('LPRDATA').value;
  // Checkbox & Data Amount for JMS
  var jms = document.getElementById('group[6927]-6927-3').value;
  var jmsData = document.getElementById('JMSDATA').value;
  // Checkbox & Data Amount for Other
  var other = document.getElementById('group[6927]-6927-4').value;
  var otherData = document.getElementById('OTHERDATA').value;
  //Peace Officers
  var fte1 = document.getElementById('FTE1').value;
  var fte2 = document.getElementById('FTE2').value;
  var fte3 = document.getElementById('FTE3').value;
  var popser = document.getElementById('POPSER').value;
  // Additional Information
  var creditCard = document.getElementsByName('PMOP');
  // How did you learn about the CISC?
  var reference = document.getElementsByName('reference');
  // Message
  var message = document.getElementById('MESSAGE').value

  // get value of check membership
  for (i=0; i < membership.length; i++){
    if (membership[i].checked){
      membership = membership[i].value;
    }
  }
  // get value of creditCard
  for(j=0; j < creditCard.length; j++){
    if(creditCard[j].checked){
      creditCard = creditCard[j].value;
    }
  }
  // get value of reference
  for(k=0; k < reference.length; k++){
    if(reference[k].checked){
      reference = reference[k].value;
    }
  }

  // make database connenction
  var db = firebase.firestore();

  db.collection("members").add({
    memberAgency: agency,
    membership: membership,
    address: add1,
    address2: add2,
    city: city,
    state: state,
    zipCode: zip,
    firstName: firstName,
    middleInital: mi,
    lastName: lastName,
    agencyRank: apicRank,
    // Pregerred Contact
    contactFirstName: pcFN,
    contactLastName:pcLN,
    contactRank: pcRank,
    businessPhone: "(" + pcBPhoneArea + ")" + pcBPhoneDetail1 + "-" + pcBPhoneDetail2,
    cellPhone: "(" + pcCPhoneArea + ")" + pcCPhoneDetail1 + "-" +pcCPhoneDetail2,
    email: pcEmail,
    // Data Sources
    rmsProvider: rmsProvider,
    cadProvider: cadProvider,
    lprProvider: lprProvider,
    jmsProvider: jmsProvider,
    otherDSP: otherDSP,
    // Checkbox & Data Amount for RMS
    rms: rms,
    rmsData: rmsData,
    // Checkbox & Data Amount for CAD
    cad: cad,
    cadData: cadData,
    // Checkbox & Data Amount for LPR
    lpr: lpr,
    lprData: lprData,
    // Checkbox & Data Amount for JMS
    jms: jms,
    jmsData: jmsData,
    // Checkbox & Data Amount for Other
    other: other,
    otherData: otherData,
    //Peace Officers
    fte1: fte1,
    fte2: fte2,
    fte3: fte3,
    popser: popser,
    // Additional Information
    creditCard: creditCard,
    // How did you learn about the CISC?
    reference: reference,
    // Message
    message: message,
    // Set application status to pending
    status: "pending"
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);

      // Show user the accoutn was updated
      window.location = '/members-only/BMA-Thankyou.html';
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

// view pending application
function viewApplications(){
  var filter = document.getElementById("filter").value;;
  var db = firebase.firestore();
  var tbl = "<tr><th>Agency</th><th>Membership</th><th>Applicant Name</th><th>Status</th><th>View</th></tr>";

  //alert(filter);

  if(filter == "All"){
    query = db.collection("members");
  }else{
    query = db.collection("members").where("status", "==", filter);
  }

  // list pending applications
  query.get().then(function(querySnapshot) {
      document.getElementById('record').innerHTML = "<h2>There are no " + filter + " applications.</h2>";
      querySnapshot.forEach(function(doc){
        // output to table
        const record = doc.data();
        const docId = doc.id;
        const status = record.status;
        const agency = record.memberAgency;
        const membership = record.membership;
        const displayName = record.firstName + " " + record.lastName;

        tbl += "<tr><td>" + agency + "</td>";
        tbl += "<td>" + membership + "</td>";
        tbl += "<td>" + displayName + "</td>";
        tbl += "<td>" + status + "</td>";
        tbl += "<td><a href='/members-only/view-application.html?id="+ docId +"' class='btn btn-primary'>View Record</a></td>";

        document.getElementById('record').innerHTML = tbl;
      });
    })
    .catch(function(error){
      console.log("Error getting documents: ", error);
  });
}

// view selceded application
function viewRecord(value){
  var db = firebase.firestore();
  // list pending applications
  db.collection("members").doc(value).get().then(function(doc) {
    if (doc.exists) {

      output = "<input type='hidden' id='appID' value='" + value + "'>";
      output += "<h2 class='text-center'>" + doc.data().memberAgency + "</h2>";
      output += "<p class='text-center'>" + doc.data().address + "<br />";
      output += doc.data().city +", " + doc.data().state + "," + doc.data().zipCode + "</p>";

      output += "<hr />";

      output += "<div class='row'><div class='col-12'>";
      output += "<h3>Agency Information</h3>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-12'>";
      output += "<p><strong>Membership Level: </strong> " + doc.data().membership + "</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Person in charge: </strong> " + doc.data().firstName + " " + doc.data().middleInital +" " + doc.data().lastName + "</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Rank/Position: </strong> " + doc.data().agencyRank + "</p>";
      output += "</div></div>";

      output += "<hr />";

      output += "<div class='row'><div class='col-12'>";
      output += "<h3>Preferred Contact</h3>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Preferred Contact: </strong>" + doc.data().contactFirstName + " " + doc.data().contactLastName + "</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Rank/Positoin: </strong>" + doc.data().contactRank + "</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Business Phone: </strong>" + doc.data().businessPhone + "</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Cell Phone:</strong>" + doc.data().cellPhone + "</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-12'>";
      output += "<p><strong>Preferred Email: </strong>" + doc.data().email + "</p>";
      output += "</div></div>";

      output += "<hr />";

      output += "<div class='row'><div class='col-12'>";
      output += "<h3>Data Sources</h3>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Agency RMS Provider: </strong>"+ doc.data().rmsProvider + "</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Agency CAD Provider: </strong>"+ doc.data().cadProvider + "</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Agency LPR Provider: </strong>"+ doc.data().lprProvider + "</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Agency JMS Provider: </strong>"+ doc.data().jmsProvider + "</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-12'>";
      output += "<p><strong>Other Data Source Provider: </strong>"+ doc.data().otherDSP + "</p>";
      output += "</div></div>";

      output += "<div class='row mt-2'><div class='col-12'>";
      output += "<h4>Which data sources does your agency wish to share with the CISC?</h4>";
      output += "</div></div>";
      // RMS & Data
      output += "<div class='row'><div class='col-4'>";
      output += "<p><strong>RMS: </strong>" + doc.data().rms +"</p>";
      output += "</div><div class='col-8'>";
      output += "<p><strong>Current Amoutn of Data: </strong>" + doc.data().rmsData +"</p>";
      output += "</div></div>";
      // Cad & Data
      output += "<div class='row'><div class='col-4'>";
      output += "<p><strong>CSD: </strong>" + doc.data().cad +"</p>";
      output += "</div><div class='col-8'>";
      output += "<p><strong>Current Amoutn of Data: </strong>" + doc.data().cadData +"</p>";
      output += "</div></div>";
      // LPR & Data
      output += "<div class='row'><div class='col-4'>";
      output += "<p><strong>RMS: </strong>" + doc.data().lpr +"</p>";
      output += "</div><div class='col-8'>";
      output += "<p><strong>Current Amoutn of Data: </strong>" + doc.data().lprData +"</p>";
      output += "</div></div>";
      // JMS & Data
      output += "<div class='row'><div class='col-4'>";
      output += "<p><strong>RMS: </strong>" + doc.data().jms +"</p>";
      output += "</div><div class='col-8'>";
      output += "<p><strong>Current Amoutn of Data: </strong>" + doc.data().jmsData +"</p>";
      output += "</div></div>";
      // Other & Data
      output += "<div class='row'><div class='col-4'>";
      output += "<p><strong>RMS: </strong>" + doc.data().other +"</p>";
      output += "</div><div class='col-8'>";
      output += "<p><strong>Current Amoutn of Data: </strong>" + doc.data().otherData +"</p>";
      output += "</div></div>";

      output += "<hr />";

      output += "<div class='row'><div class='col-12'>";
      output += "<h3>Peace Officers</h3>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-12'>";
      output += "<p><strong>Total number of Certified Peace Officer (Ex-Officio User FTEs)</strong>: " + doc.data().fte1 + "</p>";
      output += "<p><strong>Total number of Certified Peace Officer FTE serving in a Detention or Corrections assignment</strong>: "+ doc.data().fte2 + "</p>";
      output += "<p><strong>Total number of non-certified peace officer FTE</strong>: " + doc.data().fte3 + "</p>";
      output += "<p><strong>Estimated community population served (City, County, State, etc.)</strong>: " + doc.data().popser + "</p>";
      output += "</div></div>";

      output += "<hr />";

      output += "<div class='row'><div class='col-12'>";
      output += "<h3>Additional Information</h3>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-6'>";
      output += "<p><strong>Reference: </strong>" + doc.data().reference +"</p>";
      output += "</div><div class='col-6'>";
      output += "<p><strong>Credit Card: </strong>" + doc.data().creditCard +"</p>";
      output += "</div></div>";

      output += "<div class='row'><div class='col-12'>";
      output += "<p><strong>Message: </strong>" + doc.data().message + "</p>";
      output += "</div></div>";


      document.getElementById('record').innerHTML = output;
      console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

// Update status of an application
function updateStatus(){
  var db = firebase.firestore();
  var status = document.getElementById("appID").value;

  //alert(status);
  db.collection("members").doc(status).update({
    status: "Approved"

    //call createMember
    //createMember(status);

  }).then(function() {
    window.location="/members-only/Pending-Applications.html";
    console.log("Document successfully updated!");
  }).catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
}

// Create Members
function createMember(id){
  var db = firebase.firestore();

  db.collection("members").doc(id).get().then(function(doc) {
    var email = doc.email;
    var password = Math.random().toString(36).slice(2)

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
    });
  });
}

// Update Profile
function updateAccount() {
  var user = firebase.auth().currentUser;
  // get updated form values
  var profilePhoto = document.getElementById('profilePhoto').value;
  var displayName = document.getElementById('fullName').value;
  var emailAddress = document.getElementById('emailAddress').value;

  user.updateProfile({
    displayName: displayName,
    photoURL: profilePhoto,
  }).then(function() {
    // Update successful.
    //alert(user.displayName);
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });

  user.updateEmail(emailAddress).then(function() {
    // Update successful.
    //alert(user.email);
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
  // Show user the accoutn was updated
  document.getElementById('updated').textContent = 'Your Profile has been updated.';
  document.getElementById('updated').classList.remove('hide');
}

// Delete Application
function deleteApplication(){
  var db = firebase.firestore();
  var status = document.getElementById("appID").value;

  db.collection("members").doc(status).delete().then(function() {
    window.location="/members-only/Pending-Applications.html";
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}
