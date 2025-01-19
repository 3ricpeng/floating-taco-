(function () {
  'use strict';

  // General function to create a button
  function createButton({ text, action, id }) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    button.className = 'btn btn-primary'; // Shared styling for all buttons
    button.addEventListener('click', action);
    return button;
  }

  // Function to create and display buttons
  function createButtonContainer(buttonsData) {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    buttonContainer.classList.add('button-container');

    // Create the Toggle button
    const expandBtn = document.createElement('button');
    expandBtn.textContent = 'Toggle';
    expandBtn.className = 'btn btn-secondary expand-btn';
    expandBtn.id = 'expandBtn';
    expandBtn.addEventListener('click', toggleExpandCollapse);

    // Create the action buttons
    const actionButtonsContainer = document.createElement('div');
    actionButtonsContainer.id = 'actionButtonsContainer';
    actionButtonsContainer.classList.add('action-buttons-container');

    buttonsData.forEach((buttonData) => {
      const button = createButton(buttonData);
      actionButtonsContainer.appendChild(button);
    });

    buttonContainer.appendChild(expandBtn);
    buttonContainer.appendChild(actionButtonsContainer);
    document.body.appendChild(buttonContainer);
  }

  // Function to dynamically calculate and update height based on number of buttons
  function toggleExpandCollapse() {
    const actionButtonsContainer = document.getElementById('actionButtonsContainer');
    const expandBtn = document.getElementById('expandBtn');
    const buttonContainer = document.getElementById('buttonContainer');
    const isExpanded = actionButtonsContainer.style.display !== 'none';

    // Dynamically calculate the container height based on number of buttons
    const numButtons = actionButtonsContainer.children.length;
    const buttonHeight = 50; // Approximate height of each button (with margin)
    const expandedHeight = numButtons * buttonHeight + 50; // Add extra height for margins

    if (isExpanded) {
      // Collapse
      actionButtonsContainer.style.display = 'none';
      expandBtn.textContent = 'Expand';
      buttonContainer.style.height = '50px'; // Collapsed height
    } else {
      // Expand
      actionButtonsContainer.style.display = 'flex';
      expandBtn.textContent = 'Collapse';
      buttonContainer.style.height = expandedHeight + 'px'; // Set the dynamic height
    }
  }

  // Expose shared functions
  window.ButtonUtils = {
    createButtonContainer
  };
})();

