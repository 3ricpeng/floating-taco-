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
      text: "Create Teams Template",
      action: copyTeamsTemplate,
      id: "createTemplateTeams",
    },
    {
      text: "Create CR Template",
      action: copyCRTemplate,
      id: "createTemplateCR",
    },
  ];

  let alertsEnabled = false;

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
    const text = `@US-TB-IT Restaurant Care
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
