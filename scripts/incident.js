(function () {
  "use strict";

  /*******EARLY LOAD BEGIN ***************/

  console.log("Incident script running at document_start!");

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
  /*******EARLY LOAD END ***************/

  // Define buttons specific to the Incident page
  const incidentButtons = [
    { text: "Copy Store#", action: copyStore, id: "copyStore" },
    { text: "Copy Incident#", action: copyIncident, id: "copyIncident" },
    { text: "Copy Contact", action: copyContact, id: "copyContact" },
    {
      text: "Teams Post",
      action: copyTeamsTemplate,
      id: "createTemplateTeams",
    },
    {
      text: "Teams Post (Rich)",
      action: copyTeamsTemplateRich,
      id: "createTemplateTeams",
    },
    { text: "CR Post", action: copyCRTemplate, id: "createTemplateCR" },
    //{ text: "open", action: Testing, id:"Testing"}
  ];

  let alertsEnabled = false;

  function Testing() {
    // Step 1: Click the button to open the popup
    const organizationButton = document.getElementById(
      "viewr.incident.u_store"
    );

    if (organizationButton) {
      // Simulate a click on the button to open the popup
      organizationButton.click();

      // Poll for the presence of the "Open Record" link
      const maxAttempts = 20; // Try for up to 2 seconds (20 * 100ms)
      let attempts = 0;

      const pollForLink = setInterval(() => {
        // Step 2: Find the link with the specific class
        const openRecordLink = document.querySelector(
          'a[data-type="reference_clickthrough"]'
        );

        if (openRecordLink) {
          // Stop polling once the link is found
          clearInterval(pollForLink);

          // Step 3: Open the link in a new page
          const newWindow = window.open(openRecordLink.href, "_blank");

          // Check if the window was opened successfully
          if (!newWindow) {
            // If pop-ups are blocked, notify the user
            alert("Pop-up was blocked. Please allow pop-ups for this page.");
          }
        }

        // Stop polling after the maximum attempts
        if (++attempts >= maxAttempts) {
          clearInterval(pollForLink);
          alert("Could not find the 'Open Record' link.");
        }
      }, 100); // Poll every 100ms to check for the link
    } else {
      alert("Organization button not found!");
    }
  }

  function copyStore() {
    const storeField = document.getElementById("incident.u_store_label");
    if (storeField) {
      // Copy the value of the store number to the clipboard
      navigator.clipboard.writeText(storeField.value).catch((err) => {
        console.error("Failed to copy Store#: " + err);
      });

      // Show alert based on the alertsEnabled status
      if (alertsEnabled) {
        alert("Store# copied to clipboard!");
      }
    }
  }

  function copyIncident() {
    const incidentField = document.getElementById(
      "sys_readonly.incident.number"
    );
    if (incidentField) {
      // Copy the value of the incident number to the clipboard
      navigator.clipboard.writeText(incidentField.value).catch((err) => {
        console.error("Failed to copy Incident#: " + err);
      });

      // Show alert based on the alertsEnabled status
      if (alertsEnabled) {
        alert("Incident# copied to clipboard!");
      }
    }
  }

  function copyContact() {
    const contactField = document.getElementById("incident.u_contact_to");
    if (contactField) {
      // Copy the value of the contact name to the clipboard
      navigator.clipboard.writeText(contactField.value).catch((err) => {
        console.error("Failed to copy Contact: " + err);
      });

      // Show alert based on the alertsEnabled status
      if (alertsEnabled) {
        alert("Contact copied to clipboard!");
      }
    }
  }

  // Version 2: Working w/ basic Rich Text
  /*
  function copyTeamsTemplate() {
    const incidentField = document.getElementById(
      "sys_readonly.incident.number"
    );
    const callerField = document.getElementById(
      "sys_display.incident.caller_id"
    );
    const shortDescriptionField = document.getElementById(
      "incident.short_description"
    );
    const notesField = document.getElementById(
      "activity-stream-work_notes-textarea"
    );
  
    // Format the text for Teams post
    const plainText = `@US-TB-IT Restaurant Care
  Store Number: ${callerField ? callerField.value : ""}
  Incident Number: ${incidentField ? incidentField.value : ""}
  Issue: ${shortDescriptionField ? shortDescriptionField.value : ""}
  KB Used:
  
  ${notesField ? notesField.value : ""}`;
  
    // Format the HTML for Teams post
    const htmlText = `
      <p><strong>@US-TB-IT Restaurant Care</strong></p>
      <p><strong>Store Number:</strong> ${callerField ? callerField.value : ""}</p>
      <p><strong>Incident Number:</strong> ${incidentField ? incidentField.value : ""}</p>
      <p><strong>Issue:</strong> ${shortDescriptionField ? shortDescriptionField.value : ""}</p>
      <p><strong>KB Used:</strong></p>
      <p>${notesField ? notesField.value : ""}</p>
    `;
  
    // Create a ClipboardItem with both plain text and HTML
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([plainText], { type: "text/plain" }),
      "text/html": new Blob([htmlText], { type: "text/html" }),
    });
  
    // Copy the formatted text to the clipboard
    navigator.clipboard
      .write([clipboardItem])
      .then(() => {
        if (alertsEnabled) {
          alert("Formatted rich text copied for Teams Post!");
        }
      })
      .catch((err) => {
        console.error("Failed to copy text: " + err);
      });
  }
*/

  /**
   * Creates TeamsTemplate
   * */
  function copyTeamsTemplate() {
    const incidentField = document.getElementById(
      "sys_readonly.incident.number"
    );
    const callerField = document.getElementById("incident.u_store_label");
    const shortDescriptionField = document.getElementById(
      "incident.short_description"
    );
    const notesField = document.getElementById(
      "activity-stream-work_notes-textarea"
    );

    // Format the text for Teams post
    const text = `@
Store Number: ${callerField ? callerField.value : ""}
Incident Number: ${incidentField ? incidentField.value : ""}
Issue: ${shortDescriptionField ? shortDescriptionField.value : ""}
KB Used:

${notesField ? notesField.value : ""}`;

    // Copy the formatted text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (alertsEnabled) {
          alert("Formatted text copied for Teams Post!");
        }
      })
      .catch((err) => {
        console.error("Failed to copy text: " + err);
      });
  }

  /**
   * Creates Teams Tempalte - Rich Text
   * */
  function copyTeamsTemplateRich() {
    const incidentField = document.getElementById(
      "sys_readonly.incident.number"
    );
    const callerField = document.getElementById("incident.u_store_label");
    const shortDescriptionField = document.getElementById(
      "incident.short_description"
    );
    const notesField = document.getElementById(
      "activity-stream-work_notes-textarea"
    );

    // Get the incident number and page URL
    const incidentNumber = incidentField ? incidentField.value : "INCXXXXXXX";
    const currentUrl = window.location.href; // Get the current URL of the page

    // Get the store number from the caller field
    const storeNumber = callerField ? callerField.value : "TBC 041114"; // Default to "TBC 041114" if the field is empty

    // Convert notes text to HTML, replacing \n with <br> for line breaks
    const notesText = notesField ? notesField.value : "";
    const formattedNotes = notesText.replace(/\n/g, "<br>");

    // Format the rich text (HTML) for Teams
    const htmlText = `
    <p><strong>@</strong></p>
    <p><strong>Store Number:</strong> ${storeNumber}</p>
    <p><strong>Incident Number:</strong> <a href="${currentUrl}">${incidentNumber}</a></p>
    <p><strong>Issue:</strong> ${
      shortDescriptionField ? shortDescriptionField.value : ""
    }</p>
    <p><strong>KB Used:</strong></p>
    <p>${formattedNotes}</p> <!-- Notes with preserved line breaks -->
  `;

    // Format the plain text for fallback
    const plainText = `@US-TB-IT Restaurant Care
Store Number: ${storeNumber}
Incident Number: ${incidentNumber} (${currentUrl})
Issue: ${shortDescriptionField ? shortDescriptionField.value : ""}
KB Used:

${notesText}`;

    // Create a ClipboardItem with both plain text and HTML
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([plainText], { type: "text/plain" }),
      "text/html": new Blob([htmlText], { type: "text/html" }),
    });

    // Copy the formatted text to the clipboard
    navigator.clipboard
      .write([clipboardItem])
      .then(() => {
        if (alertsEnabled) {
          alert("Formatted rich text copied for Teams Post!");
        }
      })
      .catch((err) => {
        console.error("Failed to copy text: " + err);
      });
  }

  function checkCorp() {
    return false;
  }
  /**
   * Creates CR Template
   * */
  function copyCRTemplate() {
    const contactNameField = document.getElementById("incident.u_contact_to");
    const storeNumberField = document.getElementById("incident.u_store_label");
    const ticketNumberField = document.getElementById(
      "sys_readonly.incident.number"
    );
    const restaurantStatusField = document.getElementById(
      "incident.u_store_open_closed_status"
    );
    const crScenarioField = document.getElementById(
      "incident.short_description"
    );
    const organizationButton = document.getElementById(
      "viewr.incident.u_store"
    );
    const storePhone = document.getElementById(
      "sys_readonly.incident.u_store.u_phone"
    );

    if (organizationButton) {
      // Click the button to open the popup
      organizationButton.click();

      // Poll for the organization field and area coach field
      const maxAttempts = 20; // Try for up to 2 seconds (20 * 100ms)
      let attempts = 0;

      const pollForFields = setInterval(() => {
        const organizationField = document.getElementById(
          "sys_readonly.u_stores.u_legal_entity_name"
        );
        const areaCoachField = document.getElementById(
          "u_stores.u_frn_area_coach_label"
        );
        let organizationValue = "";
        let areaCoachValue = "";

        if (organizationField && areaCoachField) {
          organizationValue = organizationField.value;
          areaCoachValue = areaCoachField.value;

          // Compile the text
          const text = `
Code Red KB: KB0018072

Code Red Scenarios (Pick applicable and delete the rest. Copy paste applicable scenario into Short Description):
Network Down - Orders Not Sending to Kitchen
Network Down - CC Not Processing
Network Down - All Registers Down
Electrical - (Insert Reason) Post in Code Red channel but we will no longer be opening a code red for electrical issues unless due to natural disaster.
SmartHub Unavailable on all TKDS
Unable to accept digital orders
DTDMB Down
----------------------------------------------------------------------------------------------
# Code Red Template for Reference
----------------------------------------------------------------------------------------------
Onsite contact number / Name / Job Role: ${
            contactNameField ? contactNameField.value : ""
          }
Store Number: ${storeNumberField ? storeNumberField.value : ""}
Ticket Number: ${ticketNumberField ? ticketNumberField.value : ""}
Restaurant Status(Open/Close): ${
            restaurantStatusField ? restaurantStatusField.value : ""
          }
Is the store able to process credit cards offline (under $35)?
Is the store able to send orders to the kitchen or to other POS?
Is there electrical power going to FortiGate router, Network Modem, and Aruba switch?
On-site staff available?
1. (VoIP) ${storePhone ? storePhone.value : ""}
2. (MIC)

Organization: ${organizationValue}
Area Coach: ${areaCoachValue} / Email: 
*IF CORPORATE, please provide Area Coach, Market Coach, and Region Coach emails*
CR Scenario: ${crScenarioField ? crScenarioField.value : ""}
Current Status:
Next Steps:
3rd Party Ticket #:
`;

          // Use Clipboard API to copy text
          navigator.clipboard
            .writeText(text)
            .then(() => {
              // Click the button again to close the popup
              organizationButton.click();

              // Stop polling
              clearInterval(pollForFields);

              // Show success alert based on alertsEnabled status
              if (alertsEnabled) {
                alert("Code Red Template copied to clipboard successfully!");
              }
            })
            .catch((err) => {
              console.error("Failed to copy text: " + err);
              clearInterval(pollForFields);
            });
        }

        // Stop polling after max attempts
        if (++attempts >= maxAttempts) {
          clearInterval(pollForFields);
          if (alertsEnabled) {
            alert("Couldn’t load all fields in time.");
          }
        }
      }, 100); // Poll every 100ms
    } else {
      if (alertsEnabled) {
        alert("Organization button not found!");
      }
    }
  }

  // Load buttons after the page is ready
  window.addEventListener("load", () => {
    ButtonUtils.createButtonContainer(incidentButtons);
  });
})();

/*  NO ALERT CODE 

  function copyStore() {
    const storeField = document.getElementById('incident.u_store_label');
    if (storeField) {
        // Copy the value of the store number to the clipboard without showing an alert
        navigator.clipboard.writeText(storeField.value).catch(err => {
            console.error('Failed to copy Store#: ' + err);
        });
    }
}
*/
