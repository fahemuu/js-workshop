'use strict'
angular.module('studentApp', [
  'studentList'
]);



(function() {
  console.log("Hello");
  // equivalent: get("/students.json").then(JSON.parse)
  get("/students.json").then(function(response) {
    console.log("Success !")
    return JSON.parse(response);
  }, function(error) {
    console.log("Failed ! ", error)

  }).then(function(parsedResponse) {
    console.log(parsedResponse)
  })

})()

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}