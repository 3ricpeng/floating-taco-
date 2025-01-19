(function () {
    'use strict';
  
    // Define buttons specific to the Incident page
    const incidentButtons = [
      { text: 'Copy Incident#', action: copyIncident, id: 'copyIncident' },
      { text: 'Copy Store#', action: copyStore, id: 'copyStore' },
      { text: 'Create Template A', action: createTemplateA, id: 'createTemplateA' }
    ];
  
    // Button actions
    function copyIncident() {
      alert('Copying Incident#');
      // Add Incident copy logic here
    }
  
    function copyStore() {
      alert('Copying Store#');
      // Add Store copy logic here
    }
  
    function createTemplateA() {
      alert('Creating Template A');
      // Add Template A creation logic here
    }
  
    // Load buttons after the page is ready
    window.addEventListener('load', () => {
      ButtonUtils.createButtonContainer(incidentButtons);
    });
  })();
  