(function() {
    'use strict';
  
    // Array to store the button data (text, action, and id)
    const buttonsData = [
      { text: 'Copy Incident and Store#', action: copyStoreInc, id: 'copyStoreInc' },
      { text: 'Copy Store#', action: copyStore, id: 'copyStore' },
      { text: 'Copy Incident#', action: copyInc, id: 'copyInc' }
    ];
  
    // Function to copy both the Incident and Store number
    function copyStoreInc() {
        const incidentNumberElement = document.getElementById('sys_readonly.incident.number');
        const storeNumberElement = document.getElementById('sys_display.incident.caller_id');
  
        if (incidentNumberElement && storeNumberElement) {
            const incidentNumber = incidentNumberElement.value;
            const storeNumber = storeNumberElement.value;
            const dataToCopy = `Incident Number: ${incidentNumber}\nStore Number: ${storeNumber}`;
  
            navigator.clipboard.writeText(dataToCopy)
                .then(() => alert('Incident and Store copied to clipboard:\n\n' + dataToCopy))
                .catch(err => console.error('Failed to copy: ', err));
        } else {
            alert('One or more elements not found!');
        }
    }
  
    // Function to copy just the Store number
    function copyStore() {
        const storeNumberElement = document.getElementById('sys_display.incident.caller_id');
  
        if (storeNumberElement) {
            const storeNumber = storeNumberElement.value;
  
            navigator.clipboard.writeText(`Store Number: ${storeNumber}`)
                .then(() => alert('Store copied to clipboard:\n\n' + storeNumber))
                .catch(err => console.error('Failed to copy: ', err));
        } else {
            alert('Store number element not found!');
        }
    }
  
    // Function to copy just the Incident number
    function copyInc() {
        const incidentNumberElement = document.getElementById('sys_readonly.incident.number');
  
        if (incidentNumberElement) {
            const incidentNumber = incidentNumberElement.value;
  
            navigator.clipboard.writeText(`Incident Number: ${incidentNumber}`)
                .then(() => alert('Incident copied to clipboard:\n\n' + incidentNumber))
                .catch(err => console.error('Failed to copy: ', err));
        } else {
            alert('Incident number element not found!');
        }
    }
  
    // Create and display the buttons
    function createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'buttonContainer';
        buttonContainer.classList.add('button-container');
  
        // Create the Toggle button (to expand/collapse buttons)
        const expandBtn = document.createElement('button');
        expandBtn.textContent = 'Toggle';
        expandBtn.className = 'btn btn-secondary expand-btn'; 
        expandBtn.id = 'expandBtn';
        expandBtn.addEventListener('click', toggleExpandCollapse);
  
        // Create the action buttons (will be hidden initially)
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.id = 'actionButtonsContainer';
        actionButtonsContainer.classList.add('action-buttons-container');
  
        buttonsData.forEach((button, index) => {
            const btn = document.createElement('button');
            btn.textContent = button.text;
            btn.className = 'btn btn-primary'; 
            btn.id = button.id;
            btn.addEventListener('click', button.action);
            actionButtonsContainer.appendChild(btn);
        });
  
        // Append the toggle button and action buttons container to the page
        buttonContainer.appendChild(expandBtn);
        buttonContainer.appendChild(actionButtonsContainer);
        document.body.appendChild(buttonContainer);
    }
  
    // Function to toggle expand/collapse of the buttons
    function toggleExpandCollapse() {
        const actionButtonsContainer = document.getElementById('actionButtonsContainer');
        const expandBtn = document.getElementById('expandBtn');
        const isExpanded = actionButtonsContainer.style.display !== 'none';
  
        if (isExpanded) {
            actionButtonsContainer.style.display = 'none';
            expandBtn.textContent = 'Expand';
        } else {
            actionButtonsContainer.style.display = 'flex';
            expandBtn.textContent = 'Collapse';
        }
    }
  
    // Wait for the page to load completely and then create the buttons
    window.addEventListener('load', createButtons);
  
  })();
  