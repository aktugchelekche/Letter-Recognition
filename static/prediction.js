window.onload = function () {
  console.log("Connection works");
  // NOTES: Make sure Yann has the same id
  console.log("this is testing from js");
  // 1. CONVERT TO BASE 64 WHEN USER UPLOADS IMAGE

  const fileInput = document.getElementById("pictureInput");
  let isFileReady = false;
  let base64File;

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files;
    const reader = new FileReader();
    reader.readAsBinaryString(file[0]);

    let filePromise = new Promise((resolve, reject) => {
      reader.onload = function (event) {
        base64File = btoa(event.target.result);
        isFileReady = true;
        resolve();
      };

      reader.onerror = function () {
        console.log("Cant read the file");
        reject();
      };
    });
    filePromise.then(() => {
      console.log(base64File);
    });
  });

  // 2. HANDLE FORM SUBMIT WHEN USER SUBMITS IMAGE

  //fetch() returns a Promise containing a Response object. The Promise can become either fulfilled or rejected. Fulfillment runs the first then(), returns its promise, and runs the second then(). Rejection throws on the first then() and jumps to the catch().

  const formElement = document.getElementById("formcarryForm");

  const handleForm = (event) => {
    debugger;
    event.preventDefault();

    if ((isFileReady = false)) {
      alert("files still getting processed");
    }

    let data = {
      letter: base64File
    };
    debugger;
    fetch("http://127.0.0.1:5000/prediction", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      // convert response to json
      .then((response) => response.json())
      .then((data) => {
        console.log("Res: " + data);
      })
      .catch(function (error) {
        console.log("Request filaed", error);
      });
  };

  formElement.addEventListener("submit", handleForm);
};
