// Function to open Chrome extensions page
function openChromeExtensions() {
  chrome.tabs.create({ url: 'chrome://extensions' });
}

// Function to open Edge extensions page
function openEdgeExtensions() {
  chrome.tabs.create({ url: 'edge://extensions' });
}

// Add event listeners to buttons
document.getElementById('chrome').addEventListener('click', openChromeExtensions);
document.getElementById('edge').addEventListener('click', openEdgeExtensions);

// Function to save alertsEnabled value in chrome storage
function saveAlertsEnabled(value) {
  chrome.storage.local.set({ alertsEnabled: value }, function() {
    console.log("alertsEnabled saved:", value);
  });
}

// Set up the checkbox based on stored value
chrome.storage.local.get('alertsEnabled', function(result) {
  const checkbox = document.getElementById('alerts-toggle');
  checkbox.checked = result.alertsEnabled !== undefined ? result.alertsEnabled : false;
});

// Listen for changes and save the value
document.getElementById('alerts-toggle').addEventListener('change', function() {
  saveAlertsEnabled(this.checked);
});
