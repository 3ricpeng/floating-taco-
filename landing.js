(function () {
    'use strict';
  
    // Define buttons specific to the Landing page
    const landingButtons = [
      { text: 'Copy Store#', action: copyStore, id: 'copyStore' },
      { text: 'Copy Address', action: copyAddress, id: 'copyAddress' }
    ];
  
    // Button actions
    function copyStore() {
      alert('Copying Store#');
      // Add Store copy logic here
    }
  
    function copyAddress() {
      alert('Copying Address');
      // Add Address copy logic here
    }
  
    // Load buttons after the page is ready
    window.addEventListener('load', () => {
      ButtonUtils.createButtonContainer(landingButtons);
    });
  })();
  