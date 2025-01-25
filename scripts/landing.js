(function () {
  "use strict";

  // ********************************** <- Start's Here
  console.log("Landing script running at document_start!");

  // Early loading functionality
  const earlyLoad = () => {
    console.log("Early load initializing...");
    // Prepare critical logic or data here
  };

  // Ensure DOM-dependent tasks wait until the DOM is ready
  const onDomReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  };

  // Call early loading
  earlyLoad();
  // ********************************** <- End's Here 

  // Define buttons specific to the Landing page
  const landingButtons = [
    { text: "Copy Store#", action: copyStore, id: "copyStore" },
    { text: "Copy Address", action: copyAddress, id: "copyAddress" },
    { text: "Autofill Template", action: fillNotesWithTemplate(), id: "autofillTemplate"}
  ];

  // Button actions
  function copyStore() {
    // Select the <img> element with the desired `src` attribute
    const storeImage = document.querySelector('img[src*="storeid="]');
    if (storeImage) {
      // Extract the store ID using a regular expression
      const storeIdMatch = storeImage.src.match(/storeid=(\d+)/);
      if (storeIdMatch && storeIdMatch[1]) {
        const storeId = storeIdMatch[1];
        // Copy the store ID to the clipboard
        navigator.clipboard
          .writeText(storeId)
          .then(() => {
            //alert(`Store ID "${storeId}" copied to clipboard!`);
          })
          .catch((err) => {
            console.error("Failed to copy Store ID:", err);
            alert("Failed to copy Store ID.");
          });
      } else {
        alert("Store ID not found in the image URL.");
      }
    } else {
      alert("Image with Store ID not found.");
    }
  }
  // Button 2: copy Address 
  function copyAddress() {
    // Select the <td> element with the class "infoText"
    const addressField = document.querySelector("td.infoText");
    if (addressField) {
      // Extract the text from the child <div> elements
      const addressLines = Array.from(
        addressField.querySelectorAll("div.ng-binding")
      )
        .map((div) => div.textContent.trim()) // Get and trim the text content of each <div>
        .join(" "); // Combine lines with a space separator

      // Copy the combined address to the clipboard
      navigator.clipboard
        .writeText(addressLines)
        .then(() => {
          //alert(`Address copied to clipboard:\n${addressLines}`);
        })
        .catch((err) => {
          console.error("Failed to copy address:", err);
          alert("Failed to copy address.");
        });
    } else {
      alert("Address field not found.");
    }
  }

  // Button 3: Auto Fill Template 
  function fillNotesWithTemplate() {
    // Select the textarea
    const textarea = document.querySelector("#notes");
    if (textarea) {
      // Set the value of the textarea
      textarea.value = "hello";

      // Trigger an 'input' event to simulate user interaction
      const inputEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEvent);
    } else {
      console.error("Textarea with id 'notes' not found.");
    }
  }

  

  // Initialize buttons after the DOM is ready
  onDomReady(() => {
    console.log("DOM ready. Adding Landing buttons...");
    ButtonUtils.createButtonContainer(landingButtons);
  });
})();
