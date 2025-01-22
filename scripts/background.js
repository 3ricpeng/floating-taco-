// Listener for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateSettings") {
      // Log the received settings
      console.log("Updating settings:", message.settings);
  
      // Optionally send the updated settings to all active tabs
      chrome.tabs.query({ url: "https://yum.service-now.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "applySettings", settings: message.settings });
        });
      });
  
      sendResponse({ success: true });
    }
  });
  
  // Listener for storage changes (optional, for syncing settings changes)
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") {
      console.log("Storage changes detected:", changes);
  
      // Propagate changes to all active tabs
      chrome.tabs.query({ url: "https://yum.service-now.com/*" }, (tabs) => {
        const settings = Object.fromEntries(
          Object.entries(changes).map(([key, { newValue }]) => [key, newValue])
        );
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "applySettings", settings });
        });
      });
    }
  });
  